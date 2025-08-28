import { create } from "zustand";
import { persist } from "zustand/middleware";

type ConfigState = {
  config: {
    isViewHandicapped: boolean;
    isViewElectric: boolean;
  };
  setConfig: (config: ConfigState["config"]) => void;
};

export const useConfigStore = create(
  persist<ConfigState>(
    (set) => ({
      config: {
        isViewHandicapped: false,
        isViewElectric: false,
      },
      setConfig: (config) => set({ config }),
    }),
    {
      name: "config-storage",
    },
  ),
);
