import { Energy } from "./Models/Energy";
import { Weather } from "./Models/Weather";

export class Api {
    public async getEnergy(): Promise<Energy[]> {
        const data = await fetch("https://localhost:7133/api/energy", {
        method: "GET"
      });

      return await data.json();
    }

    public async getWeather(): Promise<Weather[]> {
        const data = await fetch("https://localhost:7133/api/weather", {
        method: "GET"
      });

      return await data.json();
    }
}