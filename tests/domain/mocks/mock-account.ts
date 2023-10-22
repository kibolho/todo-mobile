import { IAccountModel, IRole } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockAccountModel = (): IAccountModel => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  accessToken: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  role: IRole.USER,
});
