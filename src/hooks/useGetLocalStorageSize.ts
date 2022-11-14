import { useCallback } from "react";

// Attribution: https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
export const useGetLocalStorageSize = () => {
  return useCallback(() => {
    if (typeof window !== "undefined") {
      var allStrings = "";
      for (var key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
          allStrings += window.localStorage[key];
        }
      }
      return allStrings
        ? 3 + (allStrings.length * 16) / (8 * 1024) + " KB"
        : "Empty (0 KB)";
    }
  }, []);
};
