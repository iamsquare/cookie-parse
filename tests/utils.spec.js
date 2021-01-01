import { splitString, nameValuePairToCookie, arrayToCookie } from '../src/utils';

describe('splitTrimLine', () => {
  it('Should generate a valid array from a string without extra whitespace', () => {
    expect(splitString('\t')('a\tb\tc')).toStrictEqual(['a', 'b', 'c']);
  });
  it('Should generate a valid array from a string with extra whitespace', () => {
    expect(splitString('\t')('  a  \tb  \t  c')).toStrictEqual(['a', 'b', 'c']);
  });
  it('Should generate a valid array from a string with subsequent separators without extra whitespaces inbetween', () => {
    expect(splitString('\t')('a\t\tb\tc')).toStrictEqual(['a', 'b', 'c']);
  });
  it('Should generate a valid array from a string with subsequent separators with extra whitespaces inbetween', () => {
    expect(splitString('\t')('a  \t  \t   b   \tc     ')).toStrictEqual(['a', 'b', 'c']);
  });
  it('Should generate a valid array skipping the trim operation', () => {
    expect(splitString('\t', { skipTrim: true })('  a  \tb  \t  c')).toStrictEqual(['  a  ', 'b  ', '  c']);
  });
  it('Should generate a valid array skipping the filtering operation', () => {
    expect(splitString('\t', { skipFilter: true })('a  \t  \t   b   \tc     ')).toStrictEqual(['a', '', 'b', 'c']);
  });
  it('Should generate a valid array skipping all the extra operations', () => {
    expect(splitString('\t', { skipTrim: true, skipFilter: true })('a  \t  \t   b   \tc     ')).toStrictEqual([
      'a  ',
      '  ',
      '   b   ',
      'c     '
    ]);
  });
});

describe('arrayToCookie', () => {
  it('Should generate a valid ParsedCookie', () => {
    expect(arrayToCookie(['.test.dev', 'TRUE', '/', 'FALSE', '1629107116', 'key1', 'value1'])).toStrictEqual({
      name: 'key1',
      value: 'value1',
      domain: 'test.dev',
      crossDomain: true,
      path: '/',
      httpOnly: false,
      https: false,
      expires: 1629107116
    });
  });

  it('Should generate a valid ParsedCookie with httpOnly domain', () => {
    expect(arrayToCookie(['#HttpOnly_.test.dev', 'TRUE', '/', 'FALSE', '1629107116', 'key1', 'value1'])).toStrictEqual({
      name: 'key1',
      value: 'value1',
      domain: 'test.dev',
      crossDomain: true,
      path: '/',
      httpOnly: true,
      https: false,
      expires: 1629107116
    });
  });

  it('Should generate a valid ParsedCookie without expiration date', () => {
    expect(arrayToCookie(['.test.dev', 'TRUE', '/', 'FALSE', '0', 'key1', 'value1'])).toStrictEqual({
      name: 'key1',
      value: 'value1',
      domain: 'test.dev',
      crossDomain: true,
      path: '/',
      httpOnly: false,
      https: false,
      expires: 0
    });
  });
});

describe('nameValuePairToCookie', () => {
  it('Should generate a valid ParsedCookie from name=value pairs', () => {
    expect(nameValuePairToCookie(['a', 'b'])).toStrictEqual({ name: 'a', value: 'b' });
  });

  it('Should generate a valid ParsedCookie from name only', () => {
    expect(nameValuePairToCookie(['a'])).toStrictEqual({ name: 'a', value: 'a' });
  });
});
