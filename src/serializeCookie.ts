import { join, map, pipe } from 'ramda';
import { isArray } from 'ramda-adjunct';

import { ParsedCookie } from './interfaces';
import { cookieToNameValuePair } from './utils';

/**
 * Serializes a single or a `ParsedCookie` array to a separated key=value sequence like:
 *
 * ```
 * 'a=b; c=d; e=f;'
 * ```
 */
export function serializeCookieString(cookie: ParsedCookie | ParsedCookie[]): string {
  return isArray(cookie) ? pipe(map(cookieToNameValuePair), join(';'))(cookie) : cookieToNameValuePair(cookie);
}
