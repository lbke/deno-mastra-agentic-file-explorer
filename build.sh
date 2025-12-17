# https://docs.deno.com/runtime/reference/env_variables/
deno compile \
--allow-env=DENO_TRACE_PERMISSIONS,MASTRA_DEV,MASTRA_AUTO_REFRESH_PROVIDERS,OPENAI_BASE_URL,NODE_ENV,MISTRAL_API_KEY,MISTRAL_BASE_URL \
--allow-net \
--frozen \
main.ts