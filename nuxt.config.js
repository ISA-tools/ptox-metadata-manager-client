export default {
  target: 'static',
  ssr: false,
  head: {
    titleTemplate: 'ptox-metadata-manager-client',
    title: 'ptox-metadata-manager-client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  css: ["@/assets/styles/colors.css", "@/assets/styles/layout.css", "animate.css/animate.min.css"],
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', ['nuxt-highcharts', {}]],
  axios: { baseURL: '/', headers: { common: { Accept: 'application/json' }}},
  pwa: { manifest: { lang: 'en' }},
  vuetify: { defaultAssets: { icons: 'fa' }},
  static: { prefix: false },
  srcDir: 'src/',
  router: { middleware: 'auth' }
}
