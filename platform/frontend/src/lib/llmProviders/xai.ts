/**
 * x.ai (Grok) LLM Provider Interaction Handler
 *
 * x.ai uses an OpenAI-compatible API, so we re-export the OpenAI interaction handler.
 * @see https://docs.x.ai/api-reference/chat-completion
 */
import OpenAiChatCompletionInteraction from "./openai";

// x.ai uses the same request/response format as OpenAI
class XaiChatCompletionInteraction extends OpenAiChatCompletionInteraction {}

export default XaiChatCompletionInteraction;

