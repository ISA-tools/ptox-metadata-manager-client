export default {
  target: 'static',
  ssr: false,
  head: {
    titleTemplate: 'PrecisionTox Metadata Manager',
    title: 'PrecisionTox Metadata Manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  css: ["@/assets/styles/layout.css", "animate.css/animate.min.css", "@/assets/styles/colors.css"],
  plugins: ["@/plugins/particles"],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', ['nuxt-highcharts', {}]],
  axios: { baseURL: '/', headers: { common: { Accept: 'application/json' }}},
  pwa: { manifest: { lang: 'en' }},
  vuetify: { defaultAssets: { icons: 'fa' }},
  static: { prefix: false },
  srcDir: 'src/',
  router: { middleware: 'auth' },
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
      })
    }
  }
}
