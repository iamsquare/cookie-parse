import { splitTrimLine, arrayToCookie } from '../src/utils';

describe('splitTrimLine', () => {
  it('Should generate a valid array from a string without extra whitespace', () => {
    expect(splitTrimLine('a\tb\tc')).toStrictEqual(['a', 'b', 'c']);
  });
  it('Should generate a valid array from a string with extra whitespace', () => {
    expect(splitTrimLine('  a  \tb  \t  c')).toStrictEqual(['a', 'b', 'c']);
  });
});

describe('arrayToCookie', () => {
  it('Should generate a valid ParsedCookie', () => {
    expect(arrayToCookie(['.test.dev', 'TRUE', '/', 'FALSE', '1629107116', 'key1', 'value1'])).toStrictEqual({
      name: 'key1',
      value: 'value1',
      domain: '.test.dev',
      crossDomain: true,
      path: '/',
      httpOnly: false,
      https: false,
      expire: 1629107116
    });
  });

  it('Should generate a valid ParsedCookie with httpOnly domain', () => {
    expect(arrayToCookie(['#HttpOnly_.test.dev', 'TRUE', '/', 'FALSE', '1629107116', 'key1', 'value1'])).toStrictEqual({
      name: 'key1',
      value: 'value1',
      domain: '.test.dev',
      crossDomain: true,
      path: '/',
      httpOnly: true,
      https: false,
      expire: 1629107116
    });
  });

  it('Should generate a valid ParsedCookie without expiration date', () => {
    expect(arrayToCookie(['#HttpOnly_.test.dev', 'TRUE', '/', 'FALSE', '0', 'key1', 'value1'])).toStrictEqual({
      name: 'key1',
      value: 'value1',
      domain: '.test.dev',
      crossDomain: true,
      path: '/',
      httpOnly: true,
      https: false,
      expire: 0
    });
  });
});
