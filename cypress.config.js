const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    setupNodeEvents(on, config) {
      on('task', {
        mkdir(dirPath) {
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
          }
          return null
        }
      })

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'chromium') {
          launchOptions.args.push('--window-size=1280,720')
        }
        return launchOptions
      })
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/results',
    video: true,
    videoCompression: 32,
    videoRecording: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000
  },
})