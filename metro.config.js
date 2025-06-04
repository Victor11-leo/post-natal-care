const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

console.log('LIGHTNINGCSS_FORCE_JS_IMPLEMENTATION:', process.env.LIGHTNINGCSS_FORCE_JS_IMPLEMENTATION);


module.exports = withNativeWind(config, { input: './app/globals.css' })