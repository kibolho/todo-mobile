import { IUser } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockAccountModel = (): IUser => ({
  username: faker.internet.email(),
  access_token: faker.string.uuid(),
});
