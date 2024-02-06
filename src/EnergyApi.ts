import { HttpClient } from "./HttpClient";
import { Energy } from "./Models/Energy";

export class EnergyApi {
    private readonly httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public async getEnergy(): Promise<Energy> {
        return this.httpClient.get(`api/energy`);
    }
};