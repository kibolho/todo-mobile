import { Authentication } from "@/domain/usecases";
import { mockAccountModel } from "@/tests/domain/mocks/mock-account";

export class RemoteAuthenticationMocked implements Authentication {
  async login(_: Authentication.LoginParams): Promise<Authentication.Model> {
    await new Promise((r) => setTimeout(r, 3000));
    return mockAccountModel()
  }

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 3000));
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
