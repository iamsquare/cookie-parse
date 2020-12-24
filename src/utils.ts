import { map, pipe, split, trim, includes, slice } from 'ramda';
import { isNotNil, isValidNumber } from 'ramda-adjunct';
import { ParsedCookie } from './interfaces';

const HTTP_ONLY_PREFIX = '#HttpOnly_';
const TRUE_CONST = 'TRUE';

export const stringIsTrue = (str: string) => str.toUpperCase() === TRUE_CONST;

export const splitTrimLine = pipe(split('\t'), map(trim));

export const arrayToCookie = ([domain, crossDomain, path, https, expire, name, value]: string[]): ParsedCookie => {
  const httpOnly = includes(HTTP_ONLY_PREFIX, domain);

  return {
    name,
    value,
    domain: httpOnly ? slice(HTTP_ONLY_PREFIX.length, Infinity, domain) : domain,
    crossDomain: stringIsTrue(crossDomain),
    path,
    httpOnly,
    https: stringIsTrue(https),
    expire: isNotNil(expire) && isValidNumber(+expire) ? +expire : 0
  };
};
