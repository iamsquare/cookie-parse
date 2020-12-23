import { filter, pipe, split } from 'ramda';
import { lengthEq } from 'ramda-adjunct';

import { mapLineToJson, splitTrimLineMap } from './utils';

// eslint-disable-next-line import/prefer-default-export
export const parseCookieFile = pipe(split('\n'), splitTrimLineMap, filter(lengthEq(7)), mapLineToJson);
