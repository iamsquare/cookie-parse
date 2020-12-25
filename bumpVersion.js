/* eslint-disable no-console, import/no-extraneous-dependencies, global-require */

const { spawn } = require('child_process');
const semver = require('semver');

function bumpCurrentVersion(argument, version) {
  switch (argument) {
    case '--patch':
      return semver.inc(version, 'patch');
    case '--minor':
      return semver.inc(version, 'minor');
    case '--major':
      return semver.inc(version, 'major');
    default:
      return version;
  }
}

const newVersion = bumpCurrentVersion(process.argv[2], require('./package.json').version);

const spawnedProcess = spawn('npm', ['version', newVersion, '-m', `Release v${newVersion}`], { stdio: 'inherit' });

spawnedProcess.on('data', data => console.log(data));
spawnedProcess.on('error', data => console.log(data));
spawnedProcess.on('close', code => {
  console.log(`child process exited with code ${code}`);
});
