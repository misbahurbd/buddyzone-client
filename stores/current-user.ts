import { Author } from "@/interfaces";
import { create } from "zustand";

interface CurrentUserStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user: Author | null;
  setUser: (user: Author | null) => void;
}

export const useCurrentUser = create<CurrentUserStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  user: null,
  setUser: (user) => set({ user }),
}));
