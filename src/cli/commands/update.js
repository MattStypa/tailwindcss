import module from 'module'
import nodePath from 'path'

import chalk from 'chalk'

import transform from './update/transform'
import * as validator from './update/validator'
import * as constants from '../../constants'
import * as emoji from '../emoji'
import * as utils from '../utils'
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

    // It may need to be in constants for testing
    const inputFile = cliParams[0] || './tailwind.js'
    const outputFile = cliParams[1] || constants.defaultConfigFile
    const inputFileSimplePath = utils.getSimplePath(inputFile)
    const outputFileSimplePath = utils.getSimplePath(outputFile)

    !utils.exists(inputFile) && utils.die(
      chalk.bold.magenta(inputFileSimplePath),
      'does not exist.'
    )

    utils.exists(outputFile) && utils.die(
      chalk.bold.magenta(outputFileSimplePath),
      'already exists.'
    )

    try {
      const oldConfig = loadOldConfig(nodePath.resolve(inputFile))
      throw new Error('test')
    } catch (e) {
      dieWithSupport('Unable to process:', chalk.bold.magenta(inputFileSimplePath))
    }

    const missingProperties = validator.getMissingRequiredProperties(oldConfig)

    if (missingProperties.length) {
      utils.error(chalk.bold.magenta(inputFile), 'is missing these properties:')
      missingProperties.forEach(property => utils.log(chalk.cyan(`- ${property}`)))
      utils.die()
    }

    // Try catch here
    const newConfig = transform(oldConfig)

    // Consolidate with default config

    // Write to file

    utils.log(emoji.yes, 'Done')

    utils.footer()

    resolve()
  })
}

function dieWithSupport(...msgs) {
  utils.error(...msgs)
  utils.log()
  utils.log(chalk.bold('We were unable to automatically upgrade your configuration file.'))
  utils.log(chalk.bold('This could be the result of a non-standard format.'))
  utils.log(chalk.bold('We would love to learn more so we can improve this tool.'))
  utils.log()
  utils.log(chalk.bold('Please open a ticket here: .'))
  utils.die()
}

function loadOldConfig(file) {
  const originalRequire = module.prototype.require;

  module.prototype.require = function(moduleName){
    switch (moduleName) {
      case 'tailwindcss/defaultConfig':
        return () => oldDefaultConfig
      case 'tailwindcss/plugins/container':
        return options => ({ plugin: 'container', options })
      default:
        return originalRequire.apply(this, arguments)
    }
  }

  const ret = require(file)

  module.prototype.require = originalRequire

  return ret
}
