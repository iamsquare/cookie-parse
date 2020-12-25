import { map, pipe, split, trim, includes, slice, ifElse, identity, replace, always } from 'ramda';
import { isNotNil, isTrue, isValidNumber } from 'ramda-adjunct';
import { ParsedCookie } from './interfaces';

const HTTP_ONLY_PREFIX = '#HttpOnly_';
const TRUE_CONST = 'TRUE';

export const stringIsTrue = (str: string) => str.toUpperCase() === TRUE_CONST;

export const splitString = (separator: string | RegExp, options?: { skipTrim: boolean }) =>
  pipe<string, string[], string[]>(
    split(separator),
    ifElse(() => isTrue(options?.skipTrim), identity, map(trim))
  );

export const nameValuePairToCookie = ([name, value]: string[]) =>
  ({ name, value: ifElse(isNotNil, identity, always(name))(value) } as ParsedCookie);

export const arrayToCookie = ([domain, crossDomain, path, https, expires, name, value]: string[]): ParsedCookie => {
  const httpOnly = includes(HTTP_ONLY_PREFIX, domain);
  const parsedExpires = Number.parseInt(expires, 10);

  return {
    ...nameValuePairToCookie([name, value]),
    domain: pipe(
      ifElse(() => isTrue(httpOnly), slice(HTTP_ONLY_PREFIX.length, Infinity), identity),
      replace(/^\./, '')
    )(domain),
    crossDomain: stringIsTrue(crossDomain),
    path,
    httpOnly,
    https: stringIsTrue(https),
    expires: isValidNumber(parsedExpires) ? parsedExpires : 0
  };
};
