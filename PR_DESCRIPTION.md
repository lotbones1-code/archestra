# x.ai (Grok) Provider Integration

Closes #1850

## Summary

This PR adds complete support for x.ai (Grok) as an LLM provider in Archestra Platform. x.ai provides an OpenAI-compatible API at `https://api.x.ai/v1`, making integration straightforward.

## Implementation Details

### Backend Changes

- **LLM Proxy Adapter** (`platform/backend/src/routes/proxy/adapterV2/xai.ts`)
  - Full implementation of `LLMProvider` interface
  - Supports both streaming and non-streaming responses
  - Uses OpenAI SDK with baseURL override for x.ai API
  - Includes request/response/stream adapters
  - Supports tool calling, vision, and all proxy features

- **Proxy Routes** (`platform/backend/src/routes/proxy/routesv2/xai.ts`)
  - Fastify routes for x.ai chat completions
  - Support for default agent and specific agent endpoints
  - Route IDs: `XaiChatCompletionsWithDefaultAgent`, `XaiChatCompletionsWithAgent`

- **Chat Integration** (`platform/backend/src/routes/chat/xai.ts`)
  - Model fetching from x.ai API
  - Client creation for chat feature
  - Integrated into chat routes and models listing

- **Configuration** (`platform/backend/src/config.ts`)
  - `ARCHESTRA_XAI_BASE_URL` (defaults to `https://api.x.ai/v1`)
  - `ARCHESTRA_CHAT_XAI_API_KEY` (falls back to `XAI_API_KEY`)

- **Type System Updates**
  - Added "xai" to `SupportedProvidersSchema` in `shared/model-constants.ts`
  - Added "xai:chatCompletions" to `SupportedProvidersDiscriminatorSchema`
  - Added provider display name: "x.ai (Grok)"
  - Added route IDs in `shared/routes.ts`
  - Updated `backend/src/types/chat-api-key.ts`

- **Service Integration**
  - Updated `llm-client.ts` for model detection and API key resolution
  - Updated chat routes for model listing and smart defaults
  - Updated error handling to use OpenAI-compatible error parsing

- **Tests**
  - Unit tests: `platform/backend/src/routes/proxy/adapterV2/xai.test.ts`
  - E2E tests: Added xaiConfig to all relevant E2E test suites

### Frontend Changes

- **Provider Support**
  - Added "xai" to `SupportedProvider` type (shared package)
  - Added xai to `providerToLogoProvider` mapping
  - Added xai to `PROVIDER_CONFIG` for API key management
  - Updated type assertions for generated API types (until API client is regenerated)

- **UI Integration**
  - Provider selector supports xai
  - Model selector supports xai models
  - Chat API key form includes xai configuration
  - Token pricing and optimization rules support xai

### Documentation

- **Provider Documentation** (`docs/pages/platform-supported-llm-providers.md`)
  - Added complete x.ai (Grok) provider section
  - Connection details, environment variables, API key setup
  - Supported models list
  - Important notes about OpenAI-compatible API

- **Deployment Documentation** (`docs/pages/platform-deployment.md`)
  - Added `ARCHESTRA_XAI_BASE_URL` environment variable documentation

## Supported Models

- `grok-4`
- `grok-4-1-fast-reasoning`
- `grok-4-1-fast-non-reasoning`
- `grok-code-fast-1`

## Verification

- [x] Non-streaming responses work correctly
- [x] Streaming responses work correctly
- [x] Chat conversations work
- [x] Model listing and selection work
- [x] Error handling works
- [x] Tool invocation works (verified in E2E tests)
- [x] Vision processing works (OpenAI-compatible, handled by mcp-image.ts)
- [x] Unit tests pass
- [x] E2E tests pass
- [x] Documentation updated

## Testing Instructions

1. Set API key:
   ```bash
   export XAI_API_KEY=your-api-key-here
   # Or
   export ARCHESTRA_CHAT_XAI_API_KEY=your-api-key-here
   ```

2. Test proxy endpoint:
   ```bash
   curl -X POST http://localhost:9000/v1/xai/default/chat/completions \
     -H "Authorization: Bearer $XAI_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "model": "grok-4",
       "messages": [{"role": "user", "content": "Hello!"}]
     }'
   ```

3. Test streaming:
   ```bash
   curl -X POST http://localhost:9000/v1/xai/default/chat/completions \
     -H "Authorization: Bearer $XAI_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "model": "grok-4",
       "messages": [{"role": "user", "content": "Hello!"}],
       "stream": true
     }'
   ```

4. Test in Chat UI:
   - Configure API key in Chat settings
   - Select x.ai provider
   - Select a Grok model
   - Start a conversation

## Notes

- x.ai uses OpenAI-compatible API, so implementation follows OpenAI patterns
- The `reasoning_effort` parameter is supported and will be passed through if present in requests
- Frontend uses type assertions for "xai" provider until API client types are regenerated
- All standard proxy features work: tool invocation, cost limits, model optimization, compression, metrics
