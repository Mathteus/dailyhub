import { create } from 'zustand';

export type User = {
  name: string;
  token: string;
}

export interface UserState {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null })
}));
