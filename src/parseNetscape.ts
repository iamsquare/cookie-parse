import { pipe, ifElse, split, map, filter } from 'ramda';
import { lengthEq, stubNull } from 'ramda-adjunct';

import { ParsedCookie } from './interfaces';
import { arrayToCookie, splitString } from './utils';

export const parseNetscapeString: (string: string) => ParsedCookie = pipe(
  splitString('\t'),
  ifElse(lengthEq(7), arrayToCookie, stubNull)
);

export const parseNetscapeFile: (buffer: Buffer) => ParsedCookie[] = pipe(
  (buffer: Buffer) => buffer.toString(),
  split('\n'),
  map(parseNetscapeString),
  filter(Boolean)
);
