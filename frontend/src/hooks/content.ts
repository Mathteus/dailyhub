import { create } from 'zustand';

export type Page = 'NEWS' | 'FINANCE' | 'TASKS' | 'TOOLS' | 'SETTINGS' | 'DONATE';

export interface IContentState {
  page: Page ;
  setPage: (page: Page) => void;
}

export const useContentStore = create<IContentState>()((set) => ({
  page: 'NEWS',
  setPage: (page: Page) => set({ page })
}));