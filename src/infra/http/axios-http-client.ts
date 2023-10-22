import {
  HttpRequest,
  HttpResponse,
  HttpClient,
  HttpStatusCode,
} from "@/data/protocols";
import Observability from "@/lib/observability";

import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        params: data.params,
        headers: data.headers,
      });
      if (!axiosResponse) {
        throw Error("Erro Desconhecido");
      }
    } catch (error) {
      Observability.captureException({ data, error, response: error.response });
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse?.status ?? HttpStatusCode.badRequest,
      body: axiosResponse?.data ?? null,
    };
  }
}
