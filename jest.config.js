module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest']

  },
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: [
    '<rootDir>/src'
  ]
}
