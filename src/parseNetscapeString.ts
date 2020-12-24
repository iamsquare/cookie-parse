import { filter, pipe, split, map } from 'ramda';
import { lengthEq } from 'ramda-adjunct';

import { ParsedCookie } from './interfaces';
import { arrayToCookie, splitTrimLine } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const parseNetscapeString: (x: string) => ParsedCookie[] = pipe(
  split('\n'),
  map(splitTrimLine),
  filter(lengthEq(7)),
  map(arrayToCookie)
);
