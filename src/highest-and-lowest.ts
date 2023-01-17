export class Kata {
  static highAndLow(numbers: string): string {
    const nums = numbers.split(' ');

    let low: number = Number.MAX_SAFE_INTEGER;
    let high: number = Number.MIN_SAFE_INTEGER;

    nums.forEach((num, i) => {
      const n = parseInt(num, 10);
      if (i === 0) {
        low = n;
        high = n;
      } else {
        if (n < low) {
          low = n;
        }
        if (n > high) {
          high = n;
        }
      }
    });

    return `${high} ${low}`;
  }
}

console.log(Kata.highAndLow('1 2 3 4 5 6'));
