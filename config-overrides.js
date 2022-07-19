const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const fs = require('fs')
const paths = require('react-scripts/config/paths')
const appDirectory = fs.realpathSync(process.cwd())
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')
const appPackagePath = path.resolve(__dirname, 'package.json')
// const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/'
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const isEnvDevelopment = process.env.NODE_ENV !== 'production'
const isEnvProduction = process.env.NODE_ENV === 'production'
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

const appModules = [
  {
    name: 'index',
    title: 'index',
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.tsx'),
  },
  {
    name: 'admin',
    title: 'admin',
    appHtml: resolveApp('public/admin.html'),
    appIndexJs: resolveApp('src/admin.tsx'),
  },
]

let entries = {}
appModules.forEach((appPage) => {
  entries[appPage.name] = [
    appPage.appIndexJs,
    //isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient')
  ].filter(Boolean)
})

const htmlPlugins = []
appModules.forEach((appPage) => {
  htmlPlugins.push(
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: appPage.appHtml,
          filename: `${appPage.name}.html`,
          title: appPage.title,
          chunks: [appPage.name],
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined,
      ),
    ),
  )
})

module.exports = {
  webpack: function (config, env) {
    ;(config.entry = entries),
      // Replace last htmlPlugin
      (config.plugins = replacePlugin(
        config.plugins,
        (name) => /HtmlWebpackPlugin/i.test(name),
        htmlPlugins[0],
      ))
    htmlPlugins.shift()
    htmlPlugins.forEach((htmlPlugin) => {
      config.plugins.push(htmlPlugin)
    })

    config.output = {
      ...config.output,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/[name]-bundle.js',
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
