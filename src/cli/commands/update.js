import nodePath from 'path'

import chalk from 'chalk'

import * as constants from '../../constants'
import * as emoji from '../emoji'
import * as utils from '../utils'

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

    const path = nodePath.resolve(inputFile)

    // This should be wrapped in a try catch
    const oldConfig = utils.readFile(path);

    // This should be wrapped in a try catch
    const test = eval(oldConfig)

    // Do the conversion

    // Consolidate with default config

    // Write to file

    utils.log(emoji.yes, 'Done')

    utils.footer()

    resolve()
  })
}
