export function loadConfig() {
    if (!Deno.env.has("MISTRAL_API_KEY")) {
        console.warn(`MISTRAL_API_KEY environment variable not set, can't call Mistral AI.
File Analyzer agent does NOT read .env files automatically,
please set your environment variables using a solution relevant for your current operating system.`)
    }
}