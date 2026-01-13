/**
 * x.ai (Grok) Chat Routes
 *
 * x.ai uses an OpenAI-compatible API at https://api.x.ai/v1
 * See: https://docs.x.ai/api-reference
 */
import { createOpenAI } from "@ai-sdk/openai";
import config from "@/config";
import logger from "@/logging";
import type { ModelInfo } from "./routes.models";

const XAI_BASE_URL = "https://api.x.ai/v1";

/**
 * Fetch models from x.ai API
 * x.ai exposes an OpenAI-compatible /models endpoint
 */
export async function fetchXaiModels(apiKey: string): Promise<ModelInfo[]> {
  const url = `${XAI_BASE_URL}/models`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    logger.error(
      { status: response.status, error: errorText },
      "Failed to fetch x.ai models",
    );
    throw new Error(`Failed to fetch x.ai models: ${response.status}`);
  }

  const data = (await response.json()) as {
    data: Array<{
      id: string;
      object: string;
      created?: number;
      owned_by?: string;
    }>;
  };

  // Filter to only Grok models (grok-*)
  const excludePatterns = [
    "instruct",
    "embedding",
    "tts",
    "whisper",
    "image",
    "audio",
  ];

  return data.data
    .filter((model) => {
      const id = model.id.toLowerCase();

      // Must be a grok model
      if (!id.includes("grok")) {
        return false;
      }

      // Must not contain excluded patterns
      const hasExcludedPattern = excludePatterns.some((pattern) =>
        id.includes(pattern),
      );
      return !hasExcludedPattern;
    })
    .map((model) => ({
      id: model.id,
      displayName: model.id,
      provider: "xai" as const,
      createdAt: model.created
        ? new Date(model.created * 1000).toISOString()
        : undefined,
    }));
}

/**
 * Create x.ai client using @ai-sdk/openai (since x.ai is OpenAI-compatible)
 * This can be used for direct API calls if needed
 */
export function createXaiClient(apiKey: string) {
  return createOpenAI({
    apiKey,
    baseURL: XAI_BASE_URL,
  });
}
