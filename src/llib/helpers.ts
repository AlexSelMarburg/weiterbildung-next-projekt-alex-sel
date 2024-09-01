// shorten a string
export const shortenString = (str: string, n: number) => {
  if (str.length <= n) {
    return str;
  }
  return `${str.slice(0, n - 1)}...`;
};
