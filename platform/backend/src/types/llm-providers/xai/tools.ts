/**
 * x.ai (Grok) tool schemas - OpenAI-compatible
 *
 * x.ai uses an OpenAI-compatible API, so we re-export OpenAI tool schemas.
 *
 * @see https://docs.x.ai/api-reference/chat-completion
 */
export {
  FunctionDefinitionParametersSchema,
  ToolChoiceOptionSchema,
  ToolSchema,
} from "../openai/tools";
