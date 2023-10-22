import { IUserInvitationModel } from "@/domain/models";

export interface UserInvitation {
  invite: (params: UserInvitation.InviteParams) => Promise<void>;
}

export namespace UserInvitation {
  export type InviteParams = IUserInvitationModel;
}
