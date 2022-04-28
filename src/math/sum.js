export default function () {
  return [...arguments].reduce((sum, curr) => sum + curr, 0);
}
