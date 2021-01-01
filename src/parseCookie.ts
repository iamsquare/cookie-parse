import { pipe, map, reduce, toLower, replace, head, ifElse, allPass, equals, identity, always, join } from 'ramda';
import { contained, isNotNil, stubNull } from 'ramda-adjunct';
import { ParsedCookie } from './interfaces';

import { nameValuePairToCookie, splitString } from './utils';

/**
 * Reduces a semicolon separated key=value sequence like:
 *
 * ```
 * 'a=b; c=d; e=f;'
 * ```
 *
 * to a `ParsedCookie` array
 */
export function parseCookieString(string: string): ParsedCookie[] {
  return pipe(splitString(';'), map(pipe(splitString(/=(.+)/, { skipFilter: true }), nameValuePairToCookie)))(string);
}

/**
 * Reduces a set-cookie header string like:
 *
 * ```
 * 'a=b; Domain=test.dev; Path=/; Secure; SameSite=Lax; Expires=Wed, 09 Jun 2021 10:18:14 GMT;'
 * ```
 *
 * to a `ParsedCookie` array
 */
export function parseSetCookieString(string: string): ParsedCookie {
  return pipe(splitString(';'), map(splitString(/=(.+)/, { skipFilter: true })), ([[name, value], ...rest]) =>
    reduce(
      (acc, [k, v]) => {
        switch (toLower(k)) {
          case 'max-age': {
            return { ...acc, maxAge: Number.parseInt(v, 10) };
          }
          case 'expires': {
            return { ...acc, expires: Math.floor(new Date(v).getTime() / 1000) };
          }
          case 'domain': {
            return { ...acc, domain: replace(/^\./, '', v) };
          }
          case 'path': {
            return {
              ...acc,
              path: ifElse(allPass([isNotNil, pipe(head, equals('/'))]), identity, stubNull)(v) as string
            };
          }
          case 'secure': {
            return { ...acc, secure: true };
          }
          case 'httponly': {
            return { ...acc, httpOnly: true };
          }
          case 'samesite': {
            return {
              ...acc,
              sameSite: pipe(toLower, ifElse(contained(['lax', 'strict']), identity, always('none')))(v)
            };
          }
          default:
            return { ...acc, extension: [...(acc.extension || []), join('=', [k, v])] };
        }
      },
      { ...nameValuePairToCookie([name, value]), secure: false, httpOnly: false, sameSite: 'none' } as ParsedCookie,
      rest
    )
  )(string);
}
