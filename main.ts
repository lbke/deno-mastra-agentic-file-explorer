
// Deno std lib
// https://jsr.io/
import { Agent } from "@mastra/core/agent";
import { processArgs } from "./process-args.ts";
import { loadConfig } from "./load-config.ts";
import process from "node:process";


const fileExplorerAgent = new Agent({
    model: "mistral/ministral-3b-latest",
    instructions: `
    You are a file explorer agent.
    Answer user questions about a folder.
    You are provided tools to explore the folder, list files, dive into nested folders.
    `,
    name: "file-explorer",
})

async function main() {
    console.log("File Explorer says hi")
    console.log(Deno.args)
    const args = processArgs()
    // TODO: how to do that in Deno
    if (!args) process.exit(0)
    const { prompt } = args
    loadConfig()
    const msg = await fileExplorerAgent.generate([
        {
            role: "user",
            content: prompt
        }
    ])
    console.log("File Explorer says:", msg.text)
    process.exit(0)
}
await main()