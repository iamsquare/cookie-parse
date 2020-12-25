import { map, pipe, split, trim, includes, slice, ifElse, identity, replace, always } from 'ramda';
import { isNotNil, isTrue, isValidNumber } from 'ramda-adjunct';
import { ParsedCookie, SplitStringOptions } from './interfaces';
import { NameValueTuple, SplitNetscapeString } from './types';

/**
 * The string #HttpOnly_
 * @internal
 */
const HTTP_ONLY_PREFIX = '#HttpOnly_';

/**
 * The string TRUE
 * @internal
 */
const TRUE_CONST = 'TRUE';

/**
 * Checks if string is equal to 'TRUE'
 * @internal
 */
export function stringIsTrue(str: string): boolean {
  return str.toUpperCase() === TRUE_CONST;
}

/**
 * Splits a string with a separator and trims the resulting substrings,
 * unless the skipTrim option is provided
 * @internal
 */
export function splitString(separator: string | RegExp, options?: SplitStringOptions): (str: string) => string[] {
  return pipe(
    split(separator),
    ifElse(() => isTrue(options?.skipTrim), identity, map(trim))
  );
}

/**
 * Takes a [name, value] pair and maps it to a valid Cookie
 * @internal
 */
export function nameValuePairToCookie(tuple: NameValueTuple): ParsedCookie {
  const [name, value] = tuple;
  return { name, value: ifElse(isNotNil, identity, always(name))(value) } as ParsedCookie;
}

/**
 * Takes a split netscape string and maps it to a valid Cookie
 * @internal
 */
export function arrayToCookie(array: SplitNetscapeString): ParsedCookie {
  const [domain, crossDomain, path, https, expires, name, value] = array;
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
}
