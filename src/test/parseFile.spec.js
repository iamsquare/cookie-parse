import { promises as fs } from 'fs';
import path from 'path';

import { parseCookieFile } from '..';

const singleLineEquality = [
  {
    name: 'key1',
    value: 'value1',
    domain: '.test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expire: 1629107116
  }
];

const multipleLineEquality = [
  {
    name: 'key1',
    value: 'value1',
    domain: '.test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expire: 1629107116
  },
  {
    name: 'key2',
    value: 'value2',
    domain: '.test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expire: 1629107116
  },
  {
    name: 'key3',
    value: 'value3',
    domain: '.test.dev',
    crossDomain: true,
    path: '/',
    httpOnly: false,
    https: false,
    expire: 1629107116
  }
];

describe('Single Line Files', () => {
  test('Without Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withoutHeaderSingleLine'));

    expect(parseCookieFile(file.toString())).toStrictEqual(singleLineEquality);
  });

  test('With Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withHeaderSingleLine'));

    expect(parseCookieFile(file.toString())).toStrictEqual(singleLineEquality);
  });

  test('With Trim', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withTrimSingleLine'));

    expect(parseCookieFile(file.toString())).toStrictEqual(singleLineEquality);
  });
});

describe('Multiple Line Files', () => {
  test('Without Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withoutHeaderMultipleLines'));

    expect(parseCookieFile(file.toString())).toStrictEqual(multipleLineEquality);
  });

  test('With Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withHeaderMultipleLines'));

    expect(parseCookieFile(file.toString())).toStrictEqual(multipleLineEquality);
  });

  test('With Trim', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withTrimMultipleLine'));

    expect(parseCookieFile(file.toString())).toStrictEqual(multipleLineEquality);
  });
});
