/**
 * random int from interval
 * min and max included
 */
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle<T>(array: Array<T>): Array<T> {
  const ret = [...array];
  for (let i = ret.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ret[i], ret[j]] = [ret[j], ret[i]];
  }
  return ret;
}

export function remove<T>(array: Array<T>, item: T): boolean {
  const index = array.indexOf(item);
  if (index < 0) return false;
  array.splice(index, 1);
  return true;
}
