const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')
const appPackagePath = path.resolve(__dirname, 'package.json')
const appPackageJson = require(appPackagePath)
const appBuild = path.resolve(__dirname, './build/')
const appSrc = path.resolve(__dirname, 'src/')
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(appPackagePath).homepage,
  process.env.PUBLIC_URL,
)

// Utility function to replace/remove specific plugin in a webpack config
function replacePlugin(plugins, nameMatcher, newPlugin) {
  const i = plugins.findIndex((plugin) => {
    return (
      plugin.constructor &&
      plugin.constructor.name &&
      nameMatcher(plugin.constructor.name)
    )
  })
  return i > -1
    ? plugins
        .slice(0, i)
        .concat(newPlugin || [])
        .concat(plugins.slice(i + 1))
    : plugins
}

module.exports = {
  webpack: function (config, env) {
    const isEnvDevelopment = env === 'development'
    const isEnvProduction = env === 'production'

    config.entry = {
      admin: [
        isEnvDevelopment &&
          require.resolve('react-dev-utils/webpackHotDevClient'),
        path.resolve(__dirname, 'src/admin.tsx'),
      ].filter(Boolean),
      index: [
        isEnvDevelopment &&
          require.resolve('react-dev-utils/webpackHotDevClient'),
        path.resolve(__dirname, 'src/index.tsx'),
      ].filter(Boolean),
    }

    config.output = {
      path: isEnvProduction ? appBuild : undefined,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/[name].bundle.js',
      // futureEmitAssets: true,
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      publicPath: publicUrlOrPath,
      devtoolModuleFilenameTemplate: isEnvProduction
        ? (info) =>
            path.relative(appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
        : isEnvDevelopment &&
          ((info) =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
      chunkLoadingGlobal: `webpackJsonp${appPackageJson.name}`,
      globalObject: 'this',
    }

    config.plugins = config.plugins.filter(
      (p) => !/WebpackManifestPlugin/.test(p.constructor),
    )

    const miniCssExtractPlugin = new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
    })

    config.plugins = replacePlugin(
      config.plugins,
      (name) => /MiniCssExtractPlugin/i.test(name),
      miniCssExtractPlugin,
    )

    config.plugins = [
      ...config.plugins,
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['admin'],
        template: path.resolve(__dirname, 'public/admin.html'),
        filename: 'admin.html',
      }),
      new WebpackManifestPlugin({
        fileName: 'manifest.json',
        publicPath: publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path
            return manifest
          }, seed)

          const entrypointFiles = {}
          Object.keys(entrypoints).forEach((entrypoint) => {
            entrypointFiles[entrypoint] = entrypoints[entrypoint].filter(
              (fileName) => !fileName.endsWith('.map'),
            )
          })

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          }
        },
      }),
    ]
    return config
  },

  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.historyApiFallback = {
        disableDotRule: true,
        rewrites: [{ from: /^\/admin/, to: '/admin.html' }],
      }
      return config
    }
  },
}
