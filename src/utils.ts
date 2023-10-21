/**
 * Randomize array element order in-place.
 * @param array
 * @returns
 */
export function randomize<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}
