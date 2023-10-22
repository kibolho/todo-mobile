import { LocalSecureStorageAdapter } from "@/infra/cache";

export const makeLocalSecureStorageAdapter = (): LocalSecureStorageAdapter =>
  new LocalSecureStorageAdapter();
