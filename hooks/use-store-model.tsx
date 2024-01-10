import { create } from 'zustand'

interface IUseStoreModel {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoreModel = create<IUseStoreModel>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))