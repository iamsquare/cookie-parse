import { promises as fs } from 'fs';
import path from 'path';

import { parseNetscapeFile } from '../src';

const singleLineEquality = [
  {
    name: 'key1',
    value: 'value1',
    domain: 'test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expires: 1629107116
  }
];

const multipleLineEquality = [
  {
    name: 'key1',
    value: 'value1',
    domain: 'test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expires: 1629107116
  },
  {
    name: 'key2',
    value: 'value2',
    domain: 'test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expires: 1629107116
  },
  {
    name: 'key3',
    value: 'value3',
    domain: 'test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expires: 1629107116
  }
];

describe('Single Line Files', () => {
  test('Without Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withoutHeaderSingleLine'));
    expect(parseNetscapeFile(file)).toContainObjects(singleLineEquality);
  });

  test('With Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withHeaderSingleLine'));
    expect(parseNetscapeFile(file)).toContainObjects(singleLineEquality);
  });

  test('With Trim', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withTrimSingleLine'));
    expect(parseNetscapeFile(file)).toContainObjects(singleLineEquality);
  });
});

describe('Multiple Line Files', () => {
  test('Without Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withoutHeaderMultipleLines'));
    expect(parseNetscapeFile(file)).toContainObjects(multipleLineEquality);
  });

  test('With Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withHeaderMultipleLines'));
    expect(parseNetscapeFile(file)).toContainObjects(multipleLineEquality);
  });

  test('With Trim', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withTrimMultipleLine'));
    expect(parseNetscapeFile(file)).toContainObjects(multipleLineEquality);
  });
});
