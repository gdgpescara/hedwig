/**
 * Randomize array element order in-place.
 * @param array
 * @returns
 */
export function randomize<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

/*
 * Get the filters from the url
 * filters from the url are the query params which and they are converted in lowercase
 * @param url
 * @returns
 */
export function getSchedulesFiltersByUrl(url: URL) {
  const { searchParams } = url;

  let filters:
    | Partial<{
        tag: string;
      }>
    | undefined = undefined;

  if (searchParams.has("tag")) {
    filters = {
      tag: (searchParams.get("tag") as string).toLowerCase(),
    };
  }
  return filters;
}
