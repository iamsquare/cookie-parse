import { pipe, ifElse, split, map, filter } from 'ramda';
import { lengthEq, stubNull } from 'ramda-adjunct';

import { ParsedCookie } from './interfaces';
import { arrayToCookie, splitString } from './utils';

/**
 * Reduces a string like:
 *
 * ```
 * .test.dev	TRUE	/	FALSE	1629107116	key1	value1
 * ```
 *
 * to a `ParsedCookie`
 */
export function parseNetscapeString(string: string): ParsedCookie {
  return pipe(splitString('\t'), ifElse(lengthEq(7), arrayToCookie, stubNull))(string);
}

/**
 * Reduces a file like:
 *
 * ```
 * # Netscape HTTP Cookie File
 * # https://curl.haxx.se/rfc/cookie_spec.html
 * # This is a generated file! Do not edit.
 * .test.dev	TRUE	/	FALSE	1629107116	key1	value1
 * .test.dev	TRUE	/	FALSE	1629107116	key2	value2
 * .test.dev	TRUE	/	FALSE	1629107116	key3	value3
 * ```
 *
 * to a `ParsedCookie` array
 */
export function parseNetscapeFile(buffer: Buffer): ParsedCookie[] {
  return pipe(() => buffer.toString(), split('\n'), map(parseNetscapeString), filter(Boolean))();
}
