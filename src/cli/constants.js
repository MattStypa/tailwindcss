import path from 'path'

export const cli = 'tailwind'
export const defaultConfigFile = 'tailwind.config.js'
export const shortConfigStubFile = path.resolve(__dirname, './stubs/config.stub.js')
export const fullConfigStubFile = path.resolve(__dirname, '../../defaultConfig.js')
