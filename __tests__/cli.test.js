import fs from 'fs'
import path from 'path'

import cli from '../src/cli/main'
import * as constants from '../src/constants'
import * as utils from '../src/cli/utils'
import { inTempDirectory } from '../jest/jestUtils'

describe('cli', () => {
  const inputCssPath = path.resolve(__dirname, 'fixtures/tailwind-input.css')
  const customConfigPath = path.resolve(__dirname, 'fixtures/custom-config.js')
  const defaultConfigFixture = utils.readFile(constants.defaultConfigStubFile)
  const simpleConfigFixture = utils.readFile(constants.simpleConfigStubFile)

  beforeEach(() => {
    console.log = jest.fn()
    process.stdout.write = jest.fn()
  })

  describe('init', () => {
    it('creates a Tailwind config file', () => {
      return inTempDirectory(() => {
        return cli(['init']).then(() => {
          expect(utils.readFile(constants.defaultConfigFile)).toEqual(simpleConfigFixture)
        })
      })
    })

    it('creates a full Tailwind config file', () => {
      return inTempDirectory(() => {
        return cli(['init', '--full']).then(() => {
          expect(utils.readFile(constants.defaultConfigFile)).toEqual(defaultConfigFixture)
        })
      })
    })

    it('creates a Tailwind config file in a custom location', () => {
      return inTempDirectory(() => {
        return cli(['init', 'custom.js']).then(() => {
          expect(utils.exists('custom.js')).toEqual(true)
        })
      })
    })

    it('creates a Tailwind config file without comments', () => {
      return inTempDirectory(() => {
        return cli(['init', '--no-comments']).then(() => {
          expect(utils.readFile(constants.defaultConfigFile)).not.toContain('/**')
        })
      })
    })
  })

  describe('build', () => {
    it('compiles CSS file', () => {
      return cli(['build', inputCssPath]).then(() => {
        expect(process.stdout.write.mock.calls[0][0]).toContain('.example')
      })
    })

    it('compiles CSS file using custom configuration', () => {
      return cli(['build', inputCssPath, '--config', customConfigPath]).then(() => {
        expect(process.stdout.write.mock.calls[0][0]).toContain('400px')
      })
    })

    it('creates compiled CSS file', () => {
      return inTempDirectory(() => {
        return cli(['build', inputCssPath, '--output', 'output.css']).then(() => {
          expect(utils.readFile('output.css')).toContain('.example')
        })
      })
    })

    it('compiles CSS file with autoprefixer', () => {
      return cli(['build', inputCssPath]).then(() => {
        expect(process.stdout.write.mock.calls[0][0]).toContain('-ms-input-placeholder')
      })
    })

    it('compiles CSS file without autoprefixer', () => {
      return cli(['build', inputCssPath, '--no-autoprefixer']).then(() => {
        expect(process.stdout.write.mock.calls[0][0]).not.toContain('-ms-input-placeholder')
      })
    })
  })

  describe('update', () => {
    it('updates the configuration file', () => {
      return inTempDirectory(() => {
        utils.copy(constants.oldDefaultConfigStubFile, constants.oldDefaultConfigFile)

        return cli(['update']).then(() => {
          expect(utils.exists(constants.defaultConfigFile)).toEqual(true)
        })
      })
    })

    it('updates the configuration file from custom location', () => {
      expect(true).toEqual(true)
    })

    it('updates the configuration file from custom location to custom location', () => {
      expect(true).toEqual(true)
    })
  })
})
