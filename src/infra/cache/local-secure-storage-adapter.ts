import { SetStorage, GetStorage } from "@/data/protocols/cache";
import { DeleteStorage } from "@/data/protocols/cache/delete-storage";
import * as SecureStore from "expo-secure-store";

export class LocalSecureStorageAdapter
  implements SetStorage, GetStorage, DeleteStorage
{
  async set(key: string, value: object | string): Promise<void> {
    if (value) {
      const jsonValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, jsonValue);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }

  async get(key: string): Promise<any> {
    const value = await SecureStore.getItemAsync(key);
    if (!value) return undefined;
    return JSON.parse(value);
  }

  async delete(key: string): Promise<any> {
    await SecureStore.deleteItemAsync(key);
  }
}
