import { LocalStorageAdapter } from "@/infra/cache";
import { fakerObject } from "@/tests/presentation/mocks";
import { faker } from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test("Should call AsyncStorage.setItem with correct values", async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = fakerObject;

    sut.set(key, value);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test("Should call AsyncStorage.removeItem if value is null", async () => {
    const sut = makeSut();
    const key = faker.database.column();

    sut.set(key, undefined);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test("Should call AsyncStorage.getItem with correct value", async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = fakerObject;
    const getItemSpy = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(value));

    const obj = await sut.get(key);

    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
