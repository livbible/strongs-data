# LIV Bible's Strong's Concordance API

## Example

```js
import { getStrongsDataFor } from "@livbible/strongs"
const data = getStrongsDataFor("g1234")
console.log(data.description)
```

## Custom Host

If you'd like to host the Strong's data yourself you can specify a custom URL to where it is stored. `$1` gets replaced with the given Strong's number.

```js
import { strongsDataURL } from "@livbible/strongs"
strongsDataURL.href = "https://example.com/strongs-data/$1.json"
```
