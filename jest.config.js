module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: [
    'js',
    'vue',
    'json',
    'yaml',
    'yml'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '\\.yaml$': 'jest-transform-yaml',
    '\\.yml$': 'jest-transform-yaml'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/pages/**/*.vue'
  ],
  setupFiles: ["./jest-setup.js"],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "node_modules/(?!vue-router|@babel|vuetify)",
  ],
}
