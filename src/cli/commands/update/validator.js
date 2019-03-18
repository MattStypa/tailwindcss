import { has } from 'lodash'

const paths = [
  'options.prefix',
  'options.important',
  'options.separator',
  'colors',
  'screens',
  'fonts',
  'textSizes',
  'fontWeights',
  'leading',
  'tracking',
  'textColors',
  'backgroundColors',
  'backgroundPosition',
  'backgroundSize',
  'borderWidths',
  'borderColors',
  'borderRadius',
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'padding',
  'margin',
  'negativeMargin',
  'shadows',
  'zIndex',
  'opacity',
  'svgFill',
  'svgStroke',
  'modules.appearance',
  'modules.backgroundAttachment',
  'modules.backgroundColors',
  'modules.backgroundPosition',
  'modules.backgroundRepeat',
  'modules.backgroundSize',
  'modules.borderCollapse',
  'modules.borderColors',
  'modules.borderRadius',
  'modules.borderStyle',
  'modules.borderWidths',
  'modules.cursor',
  'modules.display',
  'modules.flexbox',
  'modules.float',
  'modules.fonts',
  'modules.fontWeights',
  'modules.height',
  'modules.leading',
  'modules.lists',
  'modules.margin',
  'modules.maxHeight',
  'modules.maxWidth',
  'modules.minHeight',
  'modules.minWidth',
  'modules.negativeMargin',
  'modules.objectFit',
  'modules.objectPosition',
  'modules.opacity',
  'modules.outline',
  'modules.overflow',
  'modules.padding',
  'modules.pointerEvents',
  'modules.position',
  'modules.resize',
  'modules.shadows',
  'modules.svgFill',
  'modules.svgStroke',
  'modules.tableLayout',
  'modules.textAlign',
  'modules.textColors',
  'modules.textSizes',
  'modules.textStyle',
  'modules.tracking',
  'modules.userSelect',
  'modules.verticalAlign',
  'modules.visibility',
  'modules.whitespace',
  'modules.width',
  'modules.zIndex',
  'plugins',
]

/**
 * Gets a list of paths that do not exist in the provided object
 *
 * @param {object} config
 * @return {string[]}
 */
export function getMissingRequiredProperties(config) {
  return paths.filter(path => !has(config, path))
}
