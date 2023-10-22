import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpClient,
} from "@/data/protocols";
import { fakerObject } from "@/tests/presentation/mocks";

import { faker } from "@faker-js/faker";

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
  body: fakerObject,
  headers: fakerObject,
});

export class HttpClientSpy implements HttpClient {
  url?: string;
  method?: string;
  body?: any;
  params?: any;
  headers?: any;
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
    body: undefined,
  };

  async request<R>(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.params = data.params;
    this.headers = data.headers;
    return this.response;
  }
}
