# carbon-api

## Usage

- url: `https://carbon-api.vercel.app/api`
- method: `POST`
- request.body: `code`, `theme`
  - optional theme: `3024 Night`, `A11y Dark`, `Blackboard`, `Base 16 (Dark)`, `Cobalt`, `Dracula ProPurchase`, `Duotone`, `Hopscotch`, `Lucario`, `Material`, `Monokai`, `Night Owl`, `Nord`, `Oceanic Next`, `One Light`, `One Dark`, `Panda`, `Paraiso`, `Seti`, `Shades of Purple`, `Solarized (Dark)`, `Solarized (Light)`, `SynthWave '84`, `Twilight`, `Verminal`, `VSCode`, `Yeti`, `Zenburn`
- response.data: `ArrayBuffer`

```js
const res = await axios.post(
  `https://carbon-api.vercel.app/api`,
  { code, theme },
  { responseType: 'arraybuffer' }
)
```

## Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/whosydd/carbon-api.git)

## Known issues

The maximum execution timeout is **10 seconds** when deployed on a Personal Account (Hobby plan). [read more](https://vercel.com/docs/concepts/limits/overview#serverless-function-execution-timeout)

If you got error code `FUNCTION_INVOCATION_TIMEOUT`, please retry.
