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

module.exports = params => {
  return new Promise(async (resolve, reject) => {
    const { code, theme } = params
    if (!themes.includes(theme)) {
      resolve('Bad Request')
    }
    const browser = await playwright.launchChromium({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
      chromiumSandbox: false,
    })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://carbon.now.sh/')
    // await page
    //   .getByRole('combobox', { name: 'Theme' })
    //   .getByRole('button', { name: 'open menu' })
    //   .click()
    // await page.getByText(theme).click()
    await page.getByRole('textbox', { name: 'Code editor' }).press('Control+a')
    await page.getByRole('textbox', { name: 'Code editor' }).fill(code)

    const data = await page.screenshot({ type: 'png' })
    // await page.getByRole('button', { name: 'Export menu dropdown' }).click()
    // await page.getByRole('button', { name: 'Open' }).filter({ hasText: 'Open' }).click()
    // await page.waitForURL(/blob:https:\/\/carbon.now.sh\.*/)
    // await page.getByRole('img').click()
    // const data = await page.getByRole('img').screenshot({ type: 'png' })

    // const data = await page
    //   .getByRole('textbox', { name: 'Code editor' })
    //   .screenshot({ type: 'png' })

    await browser.close()

    resolve(data)
  })
}
