import { faker } from "@faker-js/faker";

export const fakeCode = faker.number
  .int({ min: 10000, max: 999999 })
  .toString();

export const fakeCPF = "66678537025";

export const fakeEmail = faker.internet.email();

export const fakePassword = faker.internet.password();

export const fakerObject = {
  [faker.database.column()]: faker.database.column(),
  [faker.database.column()]: faker.database.column(),
};

export const fakerWord = faker.database.column();
