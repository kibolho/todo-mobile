import { Authentication } from "@/domain/usecases";
import { mockAccountModel } from "@/tests/domain/mocks/mock-account";

const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel();

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();
  loginParams: Authentication.LoginParams;
  callsCount = 0;
  error?: Error;

  async login(
    params: Authentication.LoginParams
  ): Promise<Authentication.Model> {
    this.loginParams = params;
    this.callsCount++;
    if (this.error) {
      throw this.error;
    }
    return this.account;
  }

  async logout(): Promise<void> {
    this.callsCount++;
    if (this.error) {
      throw this.error;
    }
  }
}
