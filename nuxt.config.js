import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devServer: {},
  vite: {},
  target: 'static',
  ssr: false,

  head: {
    titleTemplate: 'PrecisionTox Metadata Manager',
    title: 'PrecisionTox Metadata Manager',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'og:title', content: 'Pretox Metadata Manager' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://ptmm.netlify.app/' },
      { name: 'og:image', content: '/thumbnail.png' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  },

  css: ["@/assets/styles/layout.css", "animate.css/animate.min.css", "@/assets/styles/colors.css"],
  plugins: ["@/plugins/particles"],
  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    ['@pinia/nuxt', { disable_vuex: true }]
  ],

  modules: [['nuxt-highcharts', {}]],
  axios: { baseURL: '/', headers: { common: { Accept: 'application/json' }}},
  pwa: { manifest: { lang: 'en' }},
  vuetify: { defaultAssets: { icons: 'fa' }},

  // Added for nuxt 4 compliance
  pinia: {
    storesDirs: ['./src/stores/**']
  },

  static: { prefix: false },
  srcDir: 'src/',
  router: { middleware: 'auth' },

  build: {
    extend(config) {
      const rules = [
        {
          test: /\.mjs$/,
          include: [/node_modules/, /.nuxt/],
          type: "javascript/auto"
        },
      ]
      config.module.rules.push(...rules)
    },
    babel: {
      plugins: [
          ['@babel/plugin-proposal-private-methods', { loose: true }],
          '@babel/plugin-transform-optional-chaining',
          '@babel/plugin-transform-nullish-coalescing-operator'
      ]
    },
    transpile: ["tsparticles", "tsparticles-engine", "globby"]
  },

  compatibilityDate: '2024-11-06'
})