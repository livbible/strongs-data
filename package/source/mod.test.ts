import assert from "node:assert"
import { getStrongsDataFor } from "./mod.ts"

Deno.test(async function fetches() {
    const data = await getStrongsDataFor("g1234")
    assert.equal(data.description, "to complain throughout a crowd")
})
