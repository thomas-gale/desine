import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Attribution: https://www.robinwieruch.de/local-storage-react/#react-local-storage-hook
export const useLocalStorage = <T>(
  storageKey: string,
  fallbackState: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(fallbackState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValue(JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState);
      setLoaded(true);
    }
  }, [storageKey, fallbackState]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }, [value, storageKey, loaded]);

  return [value, setValue];
};
