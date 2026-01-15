/**
 * @deprecated LEGACY ADAPTER - Used only by LLM Proxy metrics
 *
 * x.ai (Grok) uses an OpenAI-compatible usage format.
 */
import type { OpenAi } from "@/types";

/** Returns input and output usage tokens - x.ai uses OpenAI format */
export function getUsageTokens(usage: OpenAi.Types.Usage) {
  return {
    input: usage.prompt_tokens,
    output: usage.completion_tokens,
  };
}

