import { useCallback } from "react";

export const useClearLocalStorage = () => {
  return useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  }, []);
};
