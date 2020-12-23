module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test/testUtils/setupTests.js'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};
