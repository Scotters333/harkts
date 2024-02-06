import { HttpClient } from "./HttpClient";
import { Weather } from "./Models/Weather";

export class WeatherApi {
    private readonly httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public async getWeather(id: string): Promise<Weather> {
        return this.httpClient.get(`api/weather`);
    }
};