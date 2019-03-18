import module from 'module'
import nodePath from 'path'

import chalk from 'chalk'

import * as constants from '../../constants'
import * as emoji from '../emoji'
import * as utils from '../utils'

import transform from './update/transform'
import oldDefaultConfig from './update/oldDefaultConfig'

// Needs to be updated
export const usage = 'update'
export const description = 'Updates Tailwind configuration file'

/**
 * Runs the command.
 *
 * @param {string[]} cliParams
 * @param {object} cliOptions
 * @return {Promise}
 */
export function run(cliParams, cliOptions) {
  return new Promise(resolve => {
    utils.header()

    const inputFile = cliParams[0]

    // This should die with help like build
    !inputFile && utils.die('Config file is required.')
    !utils.exists(inputFile) && utils.die(chalk.bold.magenta(inputFile), 'does not exist.')

    // Try catch here
    const oldConfig = loadOldConfig(nodePath.resolve(inputFile))

    // This dies but I dont want dies outside of here. FIX THIS
    const newConfig = transform(oldConfig)

    console.log(newConfig)
    // Do the conversion

    // Consolidate with default config

    // Write to file

    utils.log(emoji.yes, 'Done')

    utils.footer()

    resolve()
  })
}

function loadOldConfig(file) {
  const originalRequire = module.prototype.require;

  module.prototype.require = function(moduleName){
    switch (moduleName) {
      case 'tailwindcss/defaultConfig':
        return () => oldDefaultConfig
      case 'tailwindcss/plugins/container':
        return options => options
      default:
        return originalRequire.apply(this, arguments)
    }
  }

  const ret = require(file)

  module.prototype.require = originalRequire

  return ret
}
