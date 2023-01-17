export class Kata {
  static getCount(str: string): number {
    let count = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let i = 0; i < str.length; i++) {
      const char = str[i].toLowerCase();
      if (vowels.includes(char)) {
        count += 1;
      }
    }

    return count;
  }
}
