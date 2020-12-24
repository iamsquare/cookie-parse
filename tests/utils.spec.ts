import { splitTrimLine } from '../src/utils';

describe('splitTrimLine', () => {
  test('Without trim', () => {
    expect(splitTrimLine('a\tb\tc')).toStrictEqual(['a', 'b', 'c']);
  });
  test('With trim', () => {
    expect(splitTrimLine('  a  \tb  \t  c')).toStrictEqual(['a', 'b', 'c']);
  });
});
