export const fetcher = (url: string) =>
  // eslint-disable-next-line promise/prefer-await-to-then
  fetch(url).then((result) => result.json());
