const CracoLessPlugin = require("craco-less")

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#4b6bfb",
              "@font-family": "Roboto, system-ui, sans-serif"
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  style: {
    postcssOptions: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    }
  }
}
