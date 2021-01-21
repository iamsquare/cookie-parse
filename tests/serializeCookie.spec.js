import { serializeToCookieString } from '../src';

describe('Parse Cookie String', () => {
  const parsedCookies = [
    { name: 'a', value: 'b' },
    { name: 'c', value: 'd' }
  ];

  it('Should generate a valid `name=value` from ParsedCookie', () => {
    expect(serializeToCookieString(parsedCookies[0])).toBe('a=b');
    expect(serializeToCookieString(parsedCookies[1])).toBe('c=d');
  });

  it('Should generate a valid `name=value` pairs from a ParsedCookie array', () => {
    expect(serializeToCookieString(parsedCookies)).toBe('a=b;c=d');
  });
});
