/**
 * x.ai (Grok) Type Definitions
 *
 * x.ai uses an OpenAI-compatible API.
 * @see https://docs.x.ai/api-reference/chat-completion
 *
 * NOTE: x.ai types are very similar to OpenAI since x.ai implements the OpenAI API.
 */
import type OpenAIProvider from "openai";
import type { z } from "zod";
import * as XaiAPI from "./api";
import * as XaiMessages from "./messages";
import * as XaiTools from "./tools";

namespace Xai {
  export const API = XaiAPI;
  export const Messages = XaiMessages;
  export const Tools = XaiTools;

  export namespace Types {
    export type ChatCompletionsHeaders = z.infer<
      typeof XaiAPI.ChatCompletionsHeadersSchema
    >;
    export type ChatCompletionsRequest = z.infer<
      typeof XaiAPI.ChatCompletionRequestSchema
    >;
    export type ChatCompletionsResponse = z.infer<
      typeof XaiAPI.ChatCompletionResponseSchema
    >;
    export type Usage = z.infer<typeof XaiAPI.ChatCompletionUsageSchema>;

    export type FinishReason = z.infer<typeof XaiAPI.FinishReasonSchema>;
    export type Message = z.infer<typeof XaiMessages.MessageParamSchema>;
    export type Role = Message["role"];

    // x.ai uses OpenAI-compatible streaming format
    export type ChatCompletionChunk =
      OpenAIProvider.Chat.Completions.ChatCompletionChunk;
  }
}

export default Xai;
