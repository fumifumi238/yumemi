import React, { useEffect, useState } from "react";
import { fetchApi } from "./api/api";
import "./App.css";
import Rechart from "./components/rechart";
type Prefecture = {
  prefCode: number;
  prefName: string;
  checked: boolean;
};

type Population = {
  year: number;
  value: number;
};

const App = () => {
  const [prefactures, setPrefactures] = useState<Prefecture[]>([]);
  const [populations, setPopulations] = useState<{
    [key: string]: Population[];
  }>({});
  const [filterpopulations, setfilterPopulations] = useState<{
    [key: string]: Population[];
  }>({});

  useEffect(() => {
    const fetchPrefacture = (data: any) => {
      const arr: Prefecture[] = [];
      const result = data.result;
      if (result) {
        for (let i = 0; i < result.length; i++) {
          arr.push(result[i]);
          result[i].checked = false;
        }
      }
      setPrefactures(arr);
      initPopulation(arr);
    };
    fetchApi("/api/v1/prefectures", fetchPrefacture);
  }, []);

  useEffect(() => {
    const copyPopulations = JSON.parse(JSON.stringify(populations));
    Object.keys(copyPopulations).forEach((key, index) => {
      if (populations[key].length === 0 || !prefactures[index].checked) {
        delete copyPopulations[key];
      }
    });
    setfilterPopulations(copyPopulations);
  }, [prefactures, populations]);

  const initPopulation = (prefactures: Prefecture[]) => {
    const hash: { [key: string]: Population[] } = {};
    for (let i = 0; i < prefactures.length; i++) {
      hash[prefactures[i].prefName] = [];
    }
    setPopulations(hash);
  };
  const onChangeCheck = (id: number) => {
    const newData = prefactures.map((prefacture) => {
      if (prefacture.prefCode === id) {
        prefacture.checked = !prefacture.checked;
        if (
          prefacture.checked &&
          populations[prefacture.prefName].length === 0
        ) {
          const fetchPopulation = (data: any) => {
            const newPopulations = JSON.parse(JSON.stringify(populations));
            newPopulations[prefacture.prefName] = data.result.data[0].data;
            setPopulations(newPopulations);
          };
          fetchApi(
            `/api/v1/population/composition/perYear?prefCode=${id}`,
            fetchPopulation
          );
        }
      }
      return prefacture;
    });
    setPrefactures(newData);
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Title</h1>
      </div>
      <p>都道府県</p>
      <ul className="d-flex">
        {prefactures.map((prefacture) => {
          return (
            <li key={prefacture.prefCode} style={{ width: "25%" }}>
              {prefacture.prefCode}
              <label htmlFor={prefacture.prefName}>
                <input
                  type="checkbox"
                  defaultChecked={prefacture.checked}
                  onClick={() => onChangeCheck(prefacture.prefCode)}
                  id={prefacture.prefName}
                />
                {prefacture.prefName}
              </label>
            </li>
          );
        })}
      </ul>
      <Rechart filterPopulations={filterpopulations} />
    </div>
  );
};

export default App;
