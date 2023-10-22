export interface SetStorage {
  set: (key: string, value: object | string) => Promise<void>;
}
