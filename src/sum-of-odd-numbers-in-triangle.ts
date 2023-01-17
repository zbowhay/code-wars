// NOTE: generating triangle and using that to find sum
function generateTriangle(numRows = 100) {
  const triangle = [];
  let num = 1;
  while (triangle.length <= numRows) {
    const row = [];
    for (let i = 0; i < triangle.length; i++) {
      row.push(num);
      num += 2;
    }

    triangle.push(row);
  }

  // remove first element
  triangle.shift();

  return triangle;
}

export function rowSumOddNumbers(n: number): number {
  if (n < 1) {
    return 0;
  }

  const triangle = generateTriangle(n);
  return triangle[triangle.length - 1].reduce((prev, curr) => prev + curr, 0);
}

// NOTE: another way
export function rowSumOddNumbers2(n: number): number {
  return n ** 3;
}
