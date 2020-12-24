import { promises as fs } from 'fs';
import * as path from 'path';

import { parseNetscapeString } from '../src';
import { ParsedCookie } from '../src/interfaces';

const singleLineEquality: ParsedCookie[] = [
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

const multipleLineEquality: ParsedCookie[] = [
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

    expect(parseNetscapeString(file.toString())).toStrictEqual(singleLineEquality);
  });

  test('With Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withHeaderSingleLine'));

    expect(parseNetscapeString(file.toString())).toStrictEqual(singleLineEquality);
  });

  test('With Trim', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withTrimSingleLine'));

    expect(parseNetscapeString(file.toString())).toStrictEqual(singleLineEquality);
  });
});

describe('Multiple Line Files', () => {
  test('Without Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withoutHeaderMultipleLines'));

    expect(parseNetscapeString(file.toString())).toStrictEqual(multipleLineEquality);
  });

  test('With Header', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withHeaderMultipleLines'));

    expect(parseNetscapeString(file.toString())).toStrictEqual(multipleLineEquality);
  });

  test('With Trim', async () => {
    const file = await fs.readFile(path.resolve(__dirname, './testFiles/withTrimMultipleLine'));

    expect(parseNetscapeString(file.toString())).toStrictEqual(multipleLineEquality);
  });
});
