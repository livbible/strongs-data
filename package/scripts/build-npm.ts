// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt"
import deno from "../deno.json" with { type: "json" }

await emptyDir("./npm")

await build({
    entryPoints: ["./source/mod.ts"],
    outDir: "./npm",
    shims: {
        deno: true,
    },
    package: {
        name: "@livbible/strongs",
        version: deno.version,
        description: "Strong's Concordance data.",
        license: "MIT",
        repository: {
            type: "git",
            url: "git+https://github.com/livbible/strongs-data.git",
        },
        bugs: {
            url: "https://github.com/livbible/strongs-data/issues",
        },
    },
    postBuild() {
        // steps to run after building and before running the tests
        Deno.copyFileSync("LICENSE", "npm/LICENSE")
        Deno.copyFileSync("README.md", "npm/README.md")
    },
})
