const playwright = require('playwright-aws-lambda')

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
const imgs = ['PNG', 'SVG']

module.exports = params => {
  return new Promise(async (resolve, reject) => {
    const { code, theme, img } = params
    if (!themes.includes(theme) || !imgs.includes(img)) {
      resolve({
        status: 400,
        msg: 'Bad Request',
      })
    }
    const browser = await playwright.launchChromium({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://carbon.now.sh/')
    await page
      .getByRole('combobox', { name: 'Theme' })
      .getByRole('button', { name: 'open menu' })
      .click()
    await page.getByText(theme).click()
    await page.getByRole('textbox', { name: 'Code editor' }).press('Control+a')
    await page.getByRole('textbox', { name: 'Code editor' }).fill(`console.log`)
    await page.getByRole('button', { name: 'Export menu dropdown' }).click()
    await page.getByPlaceholder('carbon').click()
    await page.getByPlaceholder('carbon').fill(code)

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: img === 'PNG' ? 'PNG' : 'SVG' }).click(),
    ])

    await browser.close()

    resolve({
      status: 200,
      blob: download.url(),
    })
  })
}
