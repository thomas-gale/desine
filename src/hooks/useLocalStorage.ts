import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Attribution: https://www.robinwieruch.de/local-storage-react/#react-local-storage-hook
export const useLocalStorage = <T>(
  storageKey: string,
  fallbackState: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState);
    }
  }, [storageKey, fallbackState]);

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }, [value, storageKey]);

  return [value, setValue];
};
