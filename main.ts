import { Agent } from "@mastra/core/agent";
import { RuntimeContext } from "@mastra/core/runtime-context";
import { processArgs } from "./process-args.ts";
import { loadConfig } from "./load-config.ts";
import process from "node:process";
import { scanFolder } from "./tools.ts";

const SMALL_LLM = "mistral/ministral-3b-latest"
// const BIG_LLM = "mistral/mistral-large-latest"
const fileExplorerAgent = new Agent({
    model: SMALL_LLM,
    instructions: `
    You are a file explorer agent.
    Answer user questions about a folder.
    You are provided tools to scan the folder, list files, dive into nested folders.
    Use the appropriate tools to answer questions.
    `,
    name: "file-explorer",
    tools: { scanFolder },
    defaultGenerateOptions: {
        maxSteps: 10
    }
})

async function main() {
    console.log("> File Explorer says hi")
    const args = processArgs()
    // TODO: how to do that in Deno
    if (!args) process.exit(0)
    const { prompt, rootFolder } = args
    console.log(`> Will analyze folder "${rootFolder}"`)
    loadConfig()
    const runtimeContext = new RuntimeContext<{ rootFolder: string }>()
    runtimeContext.set("rootFolder", rootFolder)
    const msg = await fileExplorerAgent.generate([
        {
            role: "user",
            content: prompt
        },
    ], { runtimeContext, maxSteps: 10 })
    if (!msg.text) {
        console.warn("> File explorer answer is empty:", msg)
    }
    console.log("> File Explorer says:", msg.text)
    process.exit(0)
}
await main()