import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteState = {
  favorites: number[];
  addFavorite: (item: number) => void;
  removeFavorite: (item: number) => void;
};

export const useFavoriteStore = create(
  persist<FavoriteState>(
    (set) => ({
      favorites: [],
      addFavorite: (item) =>
        set((state) => ({ favorites: [...state.favorites, item] })),
      removeFavorite: (item) =>
        set((state) => ({
          favorites: state.favorites.filter((i) => i !== item),
        })),
    }),
    {
      name: "favorite-storage",
    },
  ),
);
