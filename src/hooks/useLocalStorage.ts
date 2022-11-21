import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Attribution: https://www.robinwieruch.de/local-storage-react/#react-local-storage-hook
// Modified with a loaded state check to avoid issues with next.js pre-rendering
export const useLocalStorage = <T>(
  storageKey: string,
  fallbackState: T,
  deps: any[]
): [T, boolean, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(fallbackState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(storageKey);
      if (!!storedValue) {
        setValue(JSON.parse(storedValue) ?? fallbackState);
      } else {
        setValue(fallbackState);
      }
      setLoaded(true);
    }
  }, [storageKey, fallbackState, ...deps]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }, [value, storageKey, loaded]);

  return [value, loaded, setValue];
};
