import { LocalSecureStorageAdapter } from "@/infra/cache";

export const makeLocalSecureStorageAdapter =
  new LocalSecureStorageAdapter();
