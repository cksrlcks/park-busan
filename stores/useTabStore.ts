import { create } from "zustand";

type TabStore = {
  lastTab: string | null;
  setLastTab: (tab: string) => void;
};

export const useTabStore = create<TabStore>((set) => ({
  lastTab: null,
  setLastTab: (tab) => set({ lastTab: tab }),
}));
