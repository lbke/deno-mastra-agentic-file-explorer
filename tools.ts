import { createTool } from "@mastra/core";
import { walk } from "@std/fs"

export const scanFolder = createTool({
    id: "scan-folder",
    description: `Scans the content of a folder`,
    execute: async function ({ runtimeContext }) {
        console.log("Explorting folder")
        let folderContent = await Array.fromAsync(
            walk(runtimeContext.get("rootFolder"), {
                followSymlinks: false,
                includeDirs: true,
                includeFiles: true,
                maxDepth: 30
            })
        )
        if (folderContent.length > 100) {
            console.warn("More than 100 files/folders found, will generate a prompt will only the first 100 files")
            folderContent = folderContent.slice(0, 100)
        }
        const strRepresentation = folderContent
            .map(d => `${d.isDirectory ? "(D)" : "(F)"} ${d.path}`)
            .join("\n")
        console.log("Files found in folder", strRepresentation)
        return strRepresentation
    }
})