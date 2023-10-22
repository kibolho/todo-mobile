export interface DeleteStorage {
  delete: (key: string) => Promise<void>;
}
