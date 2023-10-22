import packageJSON from "@/../package.json";

export const CONSTANTS_ENV = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  VERSION: packageJSON.version,
  MOCK_APIS: process.env.EXPO_PUBLIC_MOCK_APIS === "true",
};
