import { map, pipe, split, trim, includes, slice } from 'ramda';
import { isNotNil, toInt32 } from 'ramda-adjunct';

const HTTP_ONLY_PREFIX = '#HttpOnly_';

export const stringIsTrue = str => str.toUpperCase() === 'TRUE';

export const splitTrimLineMap = map(pipe(split('\t'), map(trim)));

export const mapLineToJson = map(([domain, crossDomain, path, https, expire, name, value]) => {
  const httpOnly = includes(HTTP_ONLY_PREFIX, domain);

  return {
    name,
    value,
    domain: httpOnly ? slice(HTTP_ONLY_PREFIX.length, Infinity, domain) : domain,
    crossDomain: stringIsTrue(crossDomain),
    path,
    httpOnly,
    https: stringIsTrue(https),
    expire: isNotNil(expire) ? toInt32(expire) : 0
  };
});
