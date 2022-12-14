import * as playwright from 'playwright-aws-lambda'

type Params = {
  code: string
  theme: string
}

const themes = [
  '3024 Night',
  'A11y Dark',
  'Blackboard',
  'Base 16 (Dark)',
  'Cobalt',
  'Dracula ProPurchase',
  'Duotone',
  'Hopscotch',
  'Lucario',
  'Material',
  'Monokai',
  'Night Owl',
  'Nord',
  'Oceanic Next',
  'One Light',
  'One Dark',
  'Panda',
  'Paraiso',
  'Seti',
  'Shades of Purple',
  'Solarized (Dark)',
  'Solarized (Light)',
  "SynthWave '84",
  'Twilight',
  'Verminal',
  'VSCode',
  'Yeti',
  'Zenburn',
]

export default (params: Params) => {
  return new Promise(async (resolve, reject) => {
    let { code, theme } = params
    if (!themes.includes(theme)) {
      theme = 'Dracula ProPurchase'
    }
    const browser = await playwright.launchChromium({ headless: true })
    const context = await browser.newContext({ screen: { width: 4096, height: 4096 } })
    const page = await context.newPage()

    await page.goto('https://carbon.now.sh/')
    await page
      .getByRole('combobox', { name: 'Theme' })
      .getByRole('button', { name: 'open menu' })
      .click()
    await page.getByText(theme).click()
    await page.getByRole('textbox', { name: 'Code editor' }).press('Control+a')
    await page.getByRole('textbox', { name: 'Code editor' }).fill(code)
    await page.getByRole('button', { name: 'Export menu dropdown' }).click()

    await page.getByRole('button', { name: 'Open' }).filter({ hasText: 'Open' }).click()
    await page.waitForURL(/blob:https:\/\/carbon.now.sh\.*/)
    const data = await page.getByRole('img').screenshot({ type: 'png' })

    await browser.close()

    resolve(data)
  })
}
