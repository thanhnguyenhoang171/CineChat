import type { StateCreator } from 'zustand';
import type { User } from '~/types/module-types/user';

type AccountState = {
  account: User | null;
  isLoadingAccount: boolean;
};

type AccountActions = {
  setAccount: (account: User | null) => void;
  resetAccount: () => void;
};

export type AccountSlice = AccountState & AccountActions;

export const createAccountSlice: StateCreator<
  AccountSlice,
  [['zustand/immer', never]],
  [],
  AccountSlice
> = (set) => ({
  account: null,
  isLoadingAccount: false,

  setAccount: (user) =>
    set((state) => {
      state.account = user;
    }),

  resetAccount: () =>
    set((state) => {
      state.account = null;
      state.isLoadingAccount = false;
    }),
});
