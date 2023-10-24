import * as React from "react";
import { makeLocalSecureStorageAdapter } from "@/main/factories/cache";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

const SecureStore = makeLocalSecureStorageAdapter;

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, undefined]
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null) => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync<T = string | object>(
  key: string,
  value: T | null
) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.delete(key);
    } else {
      // @ts-ignore
      await SecureStore.set(key, value);
    }
  }
}

export function useStorageState<T = string>(key: string): UseStateHook<T> {
  // Public
  const [state, setState] = useAsyncState<T>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(JSON.parse(localStorage.getItem(key)));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.get(key).then((value) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: T | null) => {
      setStorageItemAsync<T>(key, value).then(() => {
        setState(value);
      });
    },
    [key]
  );

  return [state, setValue];
}
