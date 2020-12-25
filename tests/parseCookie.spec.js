import { parseCookieString } from '../src';
import { parseSetCookieString } from '../src/parseCookie';

describe('Parse Cookie String', () => {
  it('Should generate valid ParsedCookies from `name=value` pairs', () => {
    expect(parseCookieString('a=b; c=d')).toContainObjects([
      { name: 'a', value: 'b' },
      { name: 'c', value: 'd' }
    ]);
    expect(parseCookieString('a=b; c=d;')).toContainObjects([
      { name: 'a', value: 'b' },
      { name: 'c', value: 'd' }
    ]);
  });

  it('Should generate valid ParsedCookies from `name=value` pairs where some values contains one or more `=` characters', () => {
    expect(parseCookieString('a=b=c; c=d')).toContainObjects([
      { name: 'a', value: 'b=c' },
      { name: 'c', value: 'd' }
    ]);
  });

  it('Should generate valid ParsedCookies from `name=value` pairs where some values are omitted', () => {
    expect(parseCookieString('a=b; c')).toContainObjects([
      { name: 'a', value: 'b' },
      { name: 'c', value: 'c' }
    ]);
  });
});

describe('Parse Set-Cookie String', () => {
  it('Should generate a valid ParsedCookie from `name=value` pairs', () => {
    expect(parseSetCookieString('a=b')).toMatchObject({ name: 'a', value: 'b' });
    expect(parseSetCookieString('a=b;')).toMatchObject({ name: 'a', value: 'b' });
  });

  it('Should parse `Expires` correctly', () => {
    expect(parseSetCookieString('a=b; Expires=Wed, 09 Jun 2021 10:18:14 GMT')).toMatchObject({
      name: 'a',
      value: 'b',
      expires: 1623233894
    });
    expect(parseSetCookieString('a=b; Expires=Tue Oct 18 2011 07:05:03 GMT+0000 (GMT)')).toMatchObject({
      name: 'a',
      value: 'b',
      expires: 1318921503
    });
    // implicit year
    expect(parseSetCookieString('a=b; Expires=10 Feb 81 13:00:00 GMT')).toMatchObject({
      name: 'a',
      value: 'b',
      expires: 350658000
    });
    // UTC
    expect(parseSetCookieString('a=b; Expires=Thu, 17-Apr-2014 02:12:29 UTC')).toMatchObject({
      name: 'a',
      value: 'b',
      expires: 1397700749
    });
  });

  it('Should parse `Max-Age` correctly', () => {
    expect(parseSetCookieString('a=b; Max-Age=123123')).toMatchObject({ name: 'a', value: 'b', maxAge: 123123 });
  });

  it('Should parse `Domain` correctly', () => {
    expect(parseSetCookieString('a=b; Domain=.test.dev')).toMatchObject({ name: 'a', value: 'b', domain: 'test.dev' });
    expect(parseSetCookieString('a=b; Domain=test.dev')).toMatchObject({ name: 'a', value: 'b', domain: 'test.dev' });
  });

  it('Should parse `Path` correctly', () => {
    expect(parseSetCookieString('a=b; Path=/')).toMatchObject({ name: 'a', value: 'b', path: '/' });
    expect(parseSetCookieString('a=b; Path=/test')).toMatchObject({ name: 'a', value: 'b', path: '/test' });
    expect(parseSetCookieString('a=b; Path=test')).toMatchObject({ name: 'a', value: 'b', path: null });
  });

  it('Should parse `Secure` correctly', () => {
    expect(parseSetCookieString('a=b; Secure')).toMatchObject({ name: 'a', value: 'b', secure: true });
    expect(parseSetCookieString('a=b;')).toMatchObject({ name: 'a', value: 'b', secure: false });
  });

  it('Should parse `HttpOnly` correctly', () => {
    expect(parseSetCookieString('a=b; HttpOnly')).toMatchObject({ name: 'a', value: 'b', httpOnly: true });
    expect(parseSetCookieString('a=b;')).toMatchObject({ name: 'a', value: 'b', httpOnly: false });
  });

  it('Should parse `SameSite` correctly', () => {
    expect(parseSetCookieString('a=b; SameSite=Lax')).toMatchObject({ name: 'a', value: 'b', sameSite: 'lax' });
    expect(parseSetCookieString('a=b; SameSite=Strict')).toMatchObject({ name: 'a', value: 'b', sameSite: 'strict' });
    expect(parseSetCookieString('a=b')).toMatchObject({ name: 'a', value: 'b', sameSite: 'none' });
  });

  it('Should parse `Extensions` correctly', () => {
    expect(parseSetCookieString('a=b; c=d; e=f')).toMatchObject({
      name: 'a',
      value: 'b',
      extension: ['c=d', 'e=f']
    });
    expect(parseSetCookieString('a=b; c=d; e=f;')).toMatchObject({
      name: 'a',
      value: 'b',
      extension: ['c=d', 'e=f']
    });
    expect(parseSetCookieString('a=b;')).not.toHaveProperty('extension');
  });
});
