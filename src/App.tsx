import React, { useEffect, useState } from 'react';
import { fetchApi } from './api/api';
import './App.css';
import PrefactureInfo from './components/PrefactureInfo';

import Rechart from './components/rechart';

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

  const initPopulation = (prefectures: Prefecture[]) => {
    const hash: { [key: string]: Population[] } = {};
    for (let i = 0; i < prefectures.length; i++) {
      hash[prefectures[i].prefName] = [];
    }
    setPopulations(hash);
  };
  type Response<T> = {
    result: T;
  };

  useEffect(() => {
    const fetchPrefacture = <T,>(data: Response<T>) => {
      const arr: Prefecture[] = [];
      const result = data.result as unknown as Prefecture[];
      if (result) {
        for (let i = 0; i < result.length; i += 1) {
          arr.push(result[i]);
          result[i].checked = false;
        }
      }
      setPrefactures(arr);
      initPopulation(arr);
    };
    const getApi = async () => {
      await fetchApi('/api/v1/prefectures', fetchPrefacture);
    };
    void getApi();
  }, []);

  useEffect(() => {
    const copyPopulations = JSON.parse(JSON.stringify(populations)) as { [key: string]: Population[] };
    Object.keys(copyPopulations).forEach((key, index) => {
      if (populations[key].length === 0 || !prefactures[index].checked) {
        delete copyPopulations[key];
      }
    });
    setfilterPopulations(copyPopulations);
  }, [prefactures, populations]);

  type PopData = {
    result: {
      data: [data: { data: Population[] }];
    };
  };

  const onChangeCheck = (id: number) => {
    const newData = prefactures.map((prefacture) => {
      if (prefacture.prefCode === id) {
        prefacture.checked = !prefacture.checked;
        if (prefacture.checked && populations[prefacture.prefName].length === 0) {
          const fetchPopulation = (data: PopData) => {
            const newPopulations = JSON.parse(JSON.stringify(populations)) as { [key: string]: Population[] };
            newPopulations[prefacture.prefName] = data.result.data[0].data;
            setPopulations(newPopulations);
          };
          const getApi = async () => {
            await fetchApi(`/api/v1/population/composition/perYear?prefCode=${id}`, fetchPopulation);
          };
          void getApi();
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
          return <PrefactureInfo prefacture={prefacture} onChangeCheck={onChangeCheck} />;
        })}
      </ul>
      <Rechart filterPopulations={filterpopulations} />
    </div>
  );
};

export default App;
