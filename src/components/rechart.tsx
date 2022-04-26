import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

type Population = {
  year: number;
  value: number;
};

const Rechart = (graphy: any) => {
  const a = [];
  for (let i = 0; i < graphy.graphy.length; i++) {
    if (graphy.graphy[i] !== undefined) {
      for (let j = 0; j < 18; j++) {
        a.push({
          year: graphy.graphy[i][j].year,
          value: graphy.graphy[i][j].value,
        });
      }
    }
  }

  console.log(a);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <LineChart
        width={730}
        height={250}
        data={a}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </>
  );
};

export default Rechart;
