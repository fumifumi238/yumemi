type Response<T> = {
  result: T;
};

export const fetchApi = async <T>(path: string, fetchData: (data: Response<T>) => void) => {
  const url = `https://opendata.resas-portal.go.jp${path}`;
  const apiKey = process.env.REACT_APP_X_API_KEY;
  if (apiKey === undefined) {
    return;
  }
  const res = await fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  });
  const data = (await res.json()) as Response<T>;
  fetchData(data);
};
