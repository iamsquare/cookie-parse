import { map, pipe, split, trim, includes, slice, ifElse, identity, replace, always, filter, Arity1Fn } from 'ramda';
import { isNotNil, isTrue, isValidNumber, isNotNilOrEmpty } from 'ramda-adjunct';
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
 * Applies the onFalse function only if bool is false, returns the value unchanged otherwise.
 * @internal
 */
export function applyOnFalse(bool: boolean, onFalse: Arity1Fn): Arity1Fn {
  return ifElse(() => isTrue(bool), identity, onFalse);
}

/**
 * Splits a string with a separator and filter and/or trims the resulting substrings,
 * unless the skipTrim and/or skipFilter options are provided
 * @internal
 */
export function splitString(separator: string | RegExp, options?: SplitStringOptions): (str: string) => string[] {
  return pipe(
    split(separator),
    applyOnFalse(options?.skipTrim, map(trim)),
    applyOnFalse(options?.skipFilter, filter(isNotNilOrEmpty))
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
 * Takes a ParsedCookie and maps it to a valid [name, value] pair
 * @internal
 */
export function cookieToNameValuePair(cookie: ParsedCookie): string {
  return !cookie.value || cookie.name === cookie.value ? cookie.name : `${cookie.name}=${cookie.value}`;
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
    domain: pipe(applyOnFalse(!httpOnly, slice(HTTP_ONLY_PREFIX.length, Infinity)), replace(/^\./, ''))(domain),
    crossDomain: stringIsTrue(crossDomain),
    path,
    httpOnly,
    https: stringIsTrue(https),
    expires: isValidNumber(parsedExpires) ? parsedExpires : 0
  };
}
