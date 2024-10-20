export const staticDataCache: {
  //cache: RequestCache,
  next: NextFetchRequestConfig;
} = {
  // cache: 'force-cache',
  next: { revalidate: 60 },
};
