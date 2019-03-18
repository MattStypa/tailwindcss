import chalk from 'chalk'
import { get, has, isFunction, isPlainObject, mapValues } from 'lodash'

import * as utils from '../../utils'
import defaultConfig from '../../../../stubs/defaultConfig.stub.js'

const variantsMap = {
  backgroundColors: ['backgroundColor'],
  borderColors: ['borderColor'],
  borderWidths: ['borderWidth'],
  flex: [
    'flexDirection',
    'flexWrap',
    'alignItems',
    'alignSelf',
    'justifyContent',
    'alignContent',
    'flex',
    'flexGrow',
    'flexShrink'
  ],
  fonts: ['fontFamily'],
  leading: ['lineHeight'],
  lists: ['listStylePosition', 'listStyleType'],
  shadows: ['boxShadow'],
  svgFill: ['fill'],
  svgStroke: ['stroke'],
  textColors: ['textColor'],
  textSizes: ['fontSize'],
  textStyle: ['fontStyle', 'textTransform', 'textDecoration', 'fontSmoothing'],
  tracking: ['letterSpacing'],
  whitespace: ['whitespace', 'wordBreak'],
}

//   inset: 'NEW CLASSES',

export default function(oldConfig) {
  const newConfig = {
    ...oldConfig.options,
    theme: {},
    variants: oldConfig.modules,
    corePlugins: {},
    plugins: [],
  }

  // Process variants
  Object.keys(variantsMap).forEach(key => {
    if (!newConfig.variants[key]) {
      newConfig.variants[key] = defaultConfig.variants[key]
      newConfig.corePlugins[key] = false
    }
  })

  // Process container plugin
  const containerPlugin = newConfig.plugins.find(isPlainObject)
  newConfig.theme.container = {...containerPlugin}
  newConfig.plugins = newConfig.plugins.filter(isFunction)
  !containerPlugin && (newConfig.corePlugins.container = false)

  return newConfig
}
