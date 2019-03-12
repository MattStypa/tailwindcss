import path from 'path'

import cli from '../src/cli/main'
import * as constants from '../src/cli/constants'
import * as utils from '../src/cli/utils'

describe('cli', () => {
  const inputCssPath = path.resolve(__dirname, 'fixtures/tailwind-input.css')
  const customConfigPath = path.resolve(__dirname, 'fixtures/custom-config.js')
  let readFileSpy;

  beforeEach(() => {
    console.log = jest.fn()
    process.stdout.write = jest.fn()
    utils.writeFile = jest.fn()
    readFileSpy = jest.spyOn(utils, 'readFile');
  })

  describe('init', () => {
    it('creates a Tailwind config file', () => {
      return cli(['init']).then(() => {
        expect(readFileSpy).toHaveBeenCalledWith(constants.shortConfigStubFile)
        expect(utils.writeFile.mock.calls[0][0]).toEqual(constants.defaultConfigFile)
      })
    })

    it('creates a Tailwind config file in a custom location', () => {
      return cli(['init', 'custom.js']).then(() => {
        expect(utils.writeFile.mock.calls[0][0]).toEqual('custom.js')
      })
    })

    it('creates a full Tailwind config file', () => {
      return cli(['init', '--full']).then(() => {
        expect(readFileSpy).toHaveBeenCalledWith(constants.fullConfigStubFile)
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
      return cli(['build', inputCssPath, '--output', 'output.css']).then(() => {
        expect(utils.writeFile.mock.calls[0][0]).toEqual('output.css')
        expect(utils.writeFile.mock.calls[0][1]).toContain('.example')
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
})
