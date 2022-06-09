import React, { useEffect, useState } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer, Label } from 'recharts';

export const fortySevenprefactures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
];
type Population = {
  year: number;
  value: number;
};

type Data = {
  [fortySevenprefactures in string]: number;
} & {
  year: number;
};

const Rechart: React.FC<{
  filterPopulations: { [key: string]: Population[] };
}> = ({ filterPopulations }) => {
  const [data, setData] = useState<Data[]>([]);

  const generateColor = () => {
    const color = (Math.random() * 0xffffff).toString(16);
    const randomColor = `#${`000000${color}`.slice(-6)}`;
    return randomColor;
  };

  useEffect(() => {
    const arr: Data[] = [];
    for (let i = 0; i <= 17; i++) {
      const hash: Data = { year: 1960 + i * 5 };
      Object.keys(filterPopulations).forEach((key) => {
        hash[key] = filterPopulations[key][i].value;
      });
      arr.push(hash);
    }
    setData(arr);
  }, [filterPopulations]);

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={data} margin={{ top: 30, left: 30, right: 0, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year">
          <Label value="year" position="insideBottom" />
        </XAxis>
        <YAxis
          label={{
            value: 'population',
            offset: 0,
            position: 'insideTopLeft',
          }}
        />

        <Tooltip />
        <Legend />
        {Object.keys(filterPopulations).map((key) => {
          return <Line type="monotone" key={key} dataKey={key} stroke={generateColor()} />;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Rechart;
