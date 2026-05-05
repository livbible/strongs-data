import fsp from "node:fs/promises"
import path from "node:path"

const sourceFolder = "source"
const buildFolder = "_site"

console.log(`\Initializing "${buildFolder}" folder...`)

await fsp.rm(buildFolder, { recursive: true, force: true })
await fsp.mkdir(buildFolder)

console.log("Building...")

const promises = []
for (const child of await fsp.readdir(sourceFolder)) {
    promises.push((async () => {
        const buffer = await fsp.readFile(path.join(sourceFolder, child))
        await fsp.writeFile(path.join(buildFolder, child), JSON.stringify(JSON.parse(buffer.toString())))
    })())
}
await Promise.allSettled(promises)

console.log("\n🎉 Build Complete! 🎉\n")
