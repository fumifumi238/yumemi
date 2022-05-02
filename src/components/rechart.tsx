import React, { useEffect } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

export const fortySevenprefactures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];
type Population = {
  year: number;
  value: number;
};

type Data = {
  year: number;
  prefactures: { [key: string]: number };
};

const Rechart: React.FC<{
  filterPopulations: { [key: string]: Population[] };
}> = ({ filterPopulations }) => {
  const data: Data[] = [];

  useEffect(() => {
    Object.keys(filterPopulations).forEach((key) => {
      for (let i = 0; i <= 17; i++) {
        if (data[i].prefactures[key] === undefined) {
          data[i].prefactures[key] = filterPopulations[key][i].value;
        }
      }
    });
  }, [filterPopulations, data]);

  for (let i = 1960; i <= 2045; i += 5) {
    data.push({ year: i, prefactures: {} });
  }

  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <div>
        {Object.keys(filterPopulations).map((key, index) => {
          return (
            <li key={index}>
              <p> {key}</p>
              <p>{filterPopulations[key][0].value}</p>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default Rechart;
