import React, { useEffect, useState } from "react";
import { fetchApi } from "./api/api";
import "./App.css";

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
  const [populations, setPopulations] = useState<Population[][]>([]);
  const apiKey = process.env.REACT_APP_X_API_KEY;

  useEffect(() => {
    const arr = Array(47);
    arr.fill(undefined);
    setPopulations(arr);
  }, []);

  useEffect(() => {
    const fetchPrefacture = (data: any) => {
      const arr: Prefecture[] = [];
      const result = data.result;
      for (let i = 0; i < result.length; i++) {
        arr.push(result[i]);
        result[i].checked = false;
      }
      setPrefactures(arr);
    };
    fetchApi("/api/v1/prefectures", fetchPrefacture);
  }, [apiKey]);

  const onChangeCheck = (id: number) => {
    console.log(id);
    const newData = prefactures.map((prefacture) => {
      if (prefacture.prefCode === id) {
        prefacture.checked = !prefacture.checked;
        if (prefacture.checked && !populations[id - 1]) {
          const fetchPopulation = (data: any) => {
            const newPopulations = populations.map((population, index) => {
              if (index === id - 1) {
                return data.result.data[0].data;
              }
              return population;
            });
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
    console.log(prefactures);
  };

  return (
    <div>
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
      <div>
        {populations.map((population, index) => {
          if (population && prefactures[index].checked) {
            return (
              <p key={index}>
                {population[0].value} {prefactures[index].prefName}
              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default App;
