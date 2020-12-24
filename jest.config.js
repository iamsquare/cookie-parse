module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/testUtils/setupTests.ts'],
  transform: {
    '^.+.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'node']
};
