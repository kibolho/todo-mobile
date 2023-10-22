jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-secure-store");
jest.mock("expo-updates", () => {
  return {
    reloadAsync: jest.fn(),
  };
});
