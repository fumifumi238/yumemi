export const fetchApi = async (
  path: string,
  fetchData: (data: any) => void
) => {
  const url = `https://opendata.resas-portal.go.jp` + path;
  const apiKey = process.env.REACT_APP_X_API_KEY;
  console.log(apiKey);
  const res = await fetch(url, {
    headers: {
      "x-api-key": apiKey ? apiKey : "",
    },
  });
  console.log(res);
  const data = await res.json();
  fetchData(data);
};
