module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/testUtils/setupTests.js'],
  preset: 'ts-jest/presets/js-with-babel',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/', '/dist/'],
  transform: {
    '^.+.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'node']
};
