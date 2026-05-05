export interface OriginalWord {
    unicode: string
    transliteration: string
}

export interface StrongsDefinition extends Record<string, StrongsDefinition> {}

export interface StrongsNumberStorage {
    originalWords: OriginalWord[] | string
    pronunciation?: string
    description: string
    literal?: string
    definition: StrongsDefinition
    origin?: string
    related: string[]
    notes?: string
}

/**
 * Where to fetch the Strong's data from. Replaces `$1` with the given Strong's number.
 * @default `https://livbible.github.io/strongs-data/$1.json`
 */
export const strongsDataURL = new URL("https://livbible.github.io/strongs-data/$1.json")

/**
 * Checks if the given text is a valid Strong's number.
 */
export function isStrongsNumber(text: string): boolean {
    return /[gh][0-9]+/.test(text)
}

/**
 * Throws an error if the given text is not a valid Strong's number.
 */
export function assertIsStrongNumber(text: string) {
    if (!isStrongsNumber(text)) throw new Error(`${text} is not a valid Strong's number`)
}

/**
 * Fetches information about the given Strong's number.
 */
export async function getStrongsDataFor(strongsNumber: string): Promise<StrongsNumberStorage> {
    assertIsStrongNumber(strongsNumber)
    const response = await fetch(strongsDataURL.href.replace("$1", strongsNumber))
    return response.json() as Promise<StrongsNumberStorage>
}
