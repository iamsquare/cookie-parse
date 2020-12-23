import { splitTrimLineMap } from '../utils';

describe('splitTrimLine', () => {
  test('Without trim', () => {
    expect(splitTrimLineMap(['a\tb\tc'])).toStrictEqual([['a', 'b', 'c']]);
  });
  test('With trim', () => {
    expect(splitTrimLineMap(['  a  \tb  \t  c'])).toStrictEqual([['a', 'b', 'c']]);
  });
});
