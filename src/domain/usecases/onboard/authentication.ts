import { IAccountModel } from "@/domain/models";

export interface Authentication {
  login: (params: Authentication.LoginParams) => Promise<Authentication.Model>;
  logout: () => Promise<void>;
}

export namespace Authentication {
  export type LoginParams = {
    email: string;
    password: string;
  };

  export type Model = IAccountModel;
}
