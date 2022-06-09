export const fetchApi = async <Response>(path: string, fetchData: (data: Response) => void) => {
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
  const data = (await res.json()) as Response;
  fetchData(data);
};
