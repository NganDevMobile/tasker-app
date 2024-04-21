import { StoreApi, create } from 'zustand';
import LocalStorage from '../local-storage';
import createAppSlice, { AppSlice } from '@services/zustand/app/AppSlice';
import createUserSlice, { UserSlice } from '@services/zustand/user/UserSlice';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import createPhotoSlice, { PhotoSlice } from './photos/PhotoSlice';

export type StoreState = AppSlice & UserSlice & PhotoSlice;
export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
) => T;

const ZustandMMKVStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return LocalStorage.set(name, value);
  },
  getItem: (name: string) => {
    const value = LocalStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    return LocalStorage.delete(name);
  },
};

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...createAppSlice(set, get),
      ...createUserSlice(set, get),
      ...createPhotoSlice(set, get),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => ZustandMMKVStorage),
    },
  ),
);

export default useStore;
