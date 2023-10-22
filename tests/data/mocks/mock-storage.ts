import { GetStorage, SetStorage } from "@/data/protocols";

export class StorageSpy implements SetStorage, GetStorage {
  setFn = jest.fn();
  getFn = jest.fn();
  async set(key: string, value: object): Promise<void> {
    this.setFn(key, value);
  }

  async get(key: string): Promise<any> {
    return await this.getFn(key);
  }
}
