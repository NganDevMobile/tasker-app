import { StoreSlice } from '@zustand';
import { IPhoto } from 'models';

export interface PhotoSlice {
  photoList: IPhoto[];
  setPhotoList: (photos: IPhoto[]) => void;
  resetPhotoList: () => void;
}

const createPhotoSlice: StoreSlice<PhotoSlice> = set => ({
  photoList: [],
  setPhotoList: (pList: IPhoto[]) => set({ photoList: pList }),
  resetPhotoList: () => set({ photoList: [] }),
});

export default createPhotoSlice;
