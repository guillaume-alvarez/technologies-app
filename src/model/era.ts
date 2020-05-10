import data from '../assets/eras.json';

export class Era {
  public name!: string;

  public id!: number;

  public roman!: string;

  constructor(name: string, id: number, roman: string) {
    this.name = name;
    this.id = id;
    this.roman = roman;
  }

  /**
   * An int value: 0 if the era is the same as the other era
   * < 0 if the era is older than the other era
   * > 0 if the era is more recent than the other era
   */
  public compareTo(era: Era): number {
    return this.id - era.id;
  }
}

function romanize(num: number): string {
  const key = [
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX',
    '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
    '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
  ];
  let roman = '';
  let remains = num;
  let i = 0;
  while (remains > 0 && i < 3) {
    roman = key[(remains % 10) + i * 10] + roman;
    remains = Math.floor(remains / 10);
    i += 1;
  }
  return 'M'.repeat(remains) + roman;
}

const erasById = new Map<number, Era>();
const erasByName = new Map<string, Era>();
export const eras = new Array<Era>();
data.forEach((name: string, index: number) => {
  const era = new Era(name, index + 1, romanize(index + 1)); // array start at index 0
  erasById.set(era.id, era);
  erasByName.set(era.name, era);
  eras.push(era);
});

export function getEra(id: number|string): Era {
  let era: Era|undefined;
  if (typeof id === 'number') {
    era = erasById.get(id);
  } else {
    era = erasByName.get(id);
  }
  if (era) {
    return era;
  }
  return erasById.get(1)!;
}
