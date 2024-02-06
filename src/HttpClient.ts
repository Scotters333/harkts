import ky, { Hooks } from "ky";
import { KyInstance } from "ky/distribution/types/ky";

export interface HttpClientOptions {
    prefixUrl?: string;
    hooks?: Hooks;
}

export class HttpClient {
    private readonly options: HttpClientOptions;
    private readonly api: KyInstance;

    constructor(options: HttpClientOptions) {
        this.options = options;

        this.api = ky.create(this.options);
    }

    public async get<TResponse>(url: string): Promise<TResponse> {
        return this.api.get(url).json();
    }

    public async getBlob(url: string): Promise<Blob> {
        return this.api.get(url).blob();
    }

    public async getBodyText(url: string): Promise<string> {
        return this.api.get(url).text();
    }

    public async post(url: string, body: unknown) {
        return this.api.post(url, { json: body });
    }

    public async put(url: string, body: unknown) {
        return this.api.put(url, { json: body });
    }

    public async delete(url: string) {
        return this.api.delete(url);
    }
}
