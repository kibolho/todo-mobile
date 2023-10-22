import { SetStorage, GetStorage } from "@/data/protocols/cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  async set(key: string, value: object): Promise<void> {
    if (value) {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.removeItem(key);
    }
  }

  async get(key: string): Promise<any> {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  }
}
