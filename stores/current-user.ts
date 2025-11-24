import { Author } from "@/interfaces";
import { create } from "zustand";
import { currentUser } from "@/features/auth/actions/current-user.action";

interface CurrentUserStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user: Author | null;
  setUser: (user: Author | null) => void;
  fetchUser: () => Promise<void>;
}

export const useCurrentUser = create<CurrentUserStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await currentUser();
      if (res.success && res.data) {
        set({ user: res.data, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch {
      set({ user: null, isLoading: false });
    }
  },
}));
