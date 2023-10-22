import { RemoteAuthenticationMocked } from "@/data/usecases/mocks";
import { Authentication } from "@/domain/usecases";

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthenticationMocked();
};
