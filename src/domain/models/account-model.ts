import { IUser } from ".";

export type IAccountModel = {
  id?: string;
  accessToken?: string;
  role: IRole;
} & IUser;

export enum IRole {
  ADMIN = 1,
  USER = 2,
}
