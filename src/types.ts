/**
 * [name, value] tuple type
 * @internal
 */
export type NameValueTuple = [name: string, value: string];

/**
 * Netscape split line type
 * @internal
 */
export type SplitNetscapeString = [
  domain: string,
  crossDomain: string,
  path: string,
  https: string,
  expires: string,
  name: string,
  value: string
];
