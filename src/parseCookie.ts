import {
  pipe,
  map,
  reduce,
  toLower,
  replace,
  head,
  ifElse,
  allPass,
  equals,
  identity,
  filter,
  always,
  join
} from 'ramda';
import { contained, isNotNil, stubNull } from 'ramda-adjunct';
import { ParsedCookie } from './interfaces';

import { nameValuePairToCookie, splitString } from './utils';

export const parseCookieString: (string: string) => ParsedCookie[] = pipe(
  splitString(';'),
  filter(Boolean),
  map(pipe(splitString(/=(.+)/, { skipTrim: true }), nameValuePairToCookie))
);

export const parseSetCookieString: (string: string) => ParsedCookie = pipe(
  splitString(';'),
  filter(Boolean),
  map(splitString(/=(.+)/, { skipTrim: true })),
  ([[name, value], ...rest]) =>
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
);
