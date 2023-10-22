import axios from "axios";
import { faker } from "@faker-js/faker";
import { fakerObject } from "@/tests/presentation/mocks";
import { HttpStatusCode } from "@/data/protocols";

export const mockHttpResponse = (): any => ({
  data: fakerObject,
  status: faker.helpers.enumValue(HttpStatusCode),
});

export const mockAxios = (
  response = mockHttpResponse()
): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(response);
  return mockedAxios;
};
