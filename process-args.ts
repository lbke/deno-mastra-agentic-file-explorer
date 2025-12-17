import { resolve, } from "@std/path";


function parseFolder(folder: string) {
    // @see https://docs.deno.com/examples/path_operations/
    const absoluteFolderPath = resolve(Deno.cwd(), folder)
    console.log("Resolved path", absoluteFolderPath)
    return absoluteFolderPath
}
function parsePrompt(prompt: string) {
    if (prompt.length >= 2000) {
        throw new Error("Prompt length over 2000 character not yet supported for security reasons.")
    }
    return prompt
}
export function processArgs() {
    if (Deno.args.length === 0) {
        console.log(`Hi, I am a file explorer AI agent. 
I can answer questions about files in a folder.
I cannot currently open files and will based my responses on filenames.
I support big folders only partially.
I use Mistral mistral/ministral-3b-latest as the AI model.

file-explorer prompt [path] 

Default path is the current folder (.)

Example usage:
file-explorer "What is this folder about?"
file-explorer ./docs "Does this docs folder have a readme?"
            `)
    }
    if (Deno.args.length > 2) {
        throw new Error("Only 2 arguments max accepted")
    }
    const prompt = parsePrompt(Deno.args[0])
    const rootFolder = parseFolder(Deno.args.length === 2 ? Deno.args[1] : ".")
    return { prompt, rootFolder }
}