import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../state/store";
import { config } from "../env/config";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Attribution: https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67
const STATE_KEY = "desine-state";
const STATE_VERSION_KEY = "desine-state-version";

export const loadState = () => {
  try {
    const serializedKey = localStorage.getItem(STATE_VERSION_KEY);
    if (!serializedKey) {
      return undefined;
    }
    const key = JSON.parse(serializedKey);
    if (key !== config.appVersion) {
      return undefined;
    }

    const serializedState = localStorage.getItem(STATE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export async function saveState(state: RootState) {
  try {
    const serializedStateKey = JSON.stringify(config.appVersion);
    localStorage.setItem(STATE_VERSION_KEY, serializedStateKey);
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}
