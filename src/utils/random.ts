export function shuffled<T>(iter: Iterable<T>) {
  const arr = Array.from(iter);
  const n = arr.length;
  const randomData = new Uint32Array(n);

  crypto.getRandomValues(randomData);

  for (let i = 0; i < n; i += 1) {
    const index = randomData[i] % (n - i);
    const tmp = arr[index];
    arr[index] = arr[n - i - 1];
    arr[n - i - 1] = tmp;
  }

  return arr;
}
export function choice<T>(iter: Iterable<T>) {
  const from = Array.from(iter);
  const randomData = new Uint32Array(1);

  crypto.getRandomValues(randomData);

  const index = randomData[0] % from.length;
  return from[index];
}
