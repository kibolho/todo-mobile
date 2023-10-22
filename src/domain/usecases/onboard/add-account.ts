import { ISignUp } from "@/domain/models";

export interface AddAccount {
  add: (params: AddAccount.Params) => Promise<void>;
}

export namespace AddAccount {
  export type Params = ISignUp;
}
