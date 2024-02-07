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

  const [options, setOptions] = useState<Highcharts.Options>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const api = useApi();

  Promise.all([
    api.getEnergy(),
    api.getWeather()
  ]).then((responses) => {
    setEnergyData(responses[0]);
    setWeatherData(responses[1]);
  });

  useEffect(() => {
    if (energyData.length > 0 && weatherData.length > 0) {
      setOptions({
        xAxis: {
            type: 'datetime'
        },
        title: {
            text: 'Energy Analytics'
        },
        series: [
          {
            type: 'line',
            name: 'Energy Consumption',
            data: energyData.map(e => {
              return {
                x: e.Date != null ? (new Date(e.Date)).getTime() : undefined,
                y: e.Consumption,
                color: e.IsAnomaly ? '#ff0000' : '#0000FF'
              } as Highcharts.PointOptionsObject
            })
          },
          {
            type: 'line',
            name: 'Humidity',
            data: weatherData.map(e => {
              return {
                x: e.Date != null ? (new Date(e.Date)).getTime() : undefined,
                y: e.Humidity
              } as Highcharts.PointOptionsObject
            })
          },
          {
            type: 'line',
            name: 'Temperature',
            data: weatherData.map(e => {
              return {
                x: e.Date != null ? (new Date(e.Date)).getTime() : undefined,
                y: e.Temperature
              } as Highcharts.PointOptionsObject
            })
          }
        ]
      });

      setIsLoading(false);
    }
  }, [energyData, weatherData]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className="chart-container">
          <HighchartsReact 
          highcharts={Highcharts}
          options={options}
        />
        </div>
    )}
    </>
  )
}

export default App;