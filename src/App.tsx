import React, { useEffect, useState } from 'react';
import './App.css';
import { useApi } from './useApi';
import { Energy } from './Models/Energy';
import { Weather } from './Models/Weather';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const App = () => {
  const [energyData, setEnergyData] = useState<Energy[]>([]);
  const [weatherData, setWeatherData] = useState<Weather[]>([]);

  const [options, setOptions] = useState<Highcharts.Options>({
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%m',
          day: '%e',
          hour: '%k',
          minute: '%M'
        }
    },
    title: {
        text: 'Energy Analytics'
    },
    series: []
  });

  const api = useApi();

  useEffect(() => {
    api.getEnergy()
    .then((response) => {
      setEnergyData(response);
    })
    .then((_) => {
      api.getWeather()
        .then((response) => {
          setWeatherData(response);
        })
        .then((_) => {
          setOptions({ series: [
            {
              type: 'line',
              data: [energyData.map(e => {
                return {
                  x: e.Date != null ? e.Date.getTime() : undefined,
                  y: e.Consumption,
                  color: e.IsAnomoly ? '#ff0000' : '#FFFFFF'
                } as Highcharts.PointOptionsObject
              })]
            },
            {
              type: 'line',
              data: [weatherData.map(e => {
                return {
                  x: e.Date != null ? e.Date.getTime() : undefined,
                  y: e.Humidity
                } as Highcharts.PointOptionsObject
              })]
            },
            {
              type: 'line',
              data: [weatherData.map(e => {
                return {
                  x: e.Date != null ? e.Date.getTime() : undefined,
                  y: e.Temperature
                } as Highcharts.PointOptionsObject
              })]
            }
          ]})
        })
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <HighchartsReact 
          highcharts={Highcharts}
          options={options}
           />
      </header>
    </div>)
}

export default App;
