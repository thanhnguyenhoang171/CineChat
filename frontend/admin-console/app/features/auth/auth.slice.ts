import type { StateCreator } from 'zustand';
import type { User } from '~/types/module-types/user';
import { authService } from '~/services/auth.service';

// 1. Định nghĩa State
type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  isRefreshToken: boolean;
  errorRefreshToken: string | null;
};

type AuthActions = {
  setAccessToken: (token: string | null) => void;
  setRefreshTokenStatus: (isRefreshing: boolean, error: string | null) => void;
  logout: () => void;
  fetchAccount: () => Promise<void>;
  loginSuccess: (token: string) => Promise<void>;
};

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/immer', never]],
  [],
  AuthSlice
> = (set, get) => ({
  // --- Initial State ---
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoadingUser: false,
  isRefreshToken: false,
  errorRefreshToken: null,

  // --- Actions ---

  setAccessToken: (token) =>
    set((state) => {
      state.accessToken = token;
      if (!token) {
        state.isAuthenticated = false;
        state.user = null;
      }
    }),

  setRefreshTokenStatus: (isRefreshing, error) =>
    set((state) => {
      state.isRefreshToken = isRefreshing;
      state.errorRefreshToken = error;
    }),

  loginSuccess: async (token) => {
    set((state) => {
      state.accessToken = token;
      state.isAuthenticated = true;
    });
    // await get().fetchAccount(); // auto call api to get user info immediately
  },

  logout: () => {
    set((state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.errorRefreshToken = null;
    });
    localStorage.removeItem('admin-console-storage');
  },

  fetchAccount: async () => {
    // Avoid multiple simultaneous fetches if already loading
    if (get().isLoadingUser) return;

    set((state) => {
      state.isLoadingUser = true;
    });

    try {
      const response = await authService.getAccount();
      set((state) => {
        state.user = response.data;
        state.isAuthenticated = true;
        state.isLoadingUser = false;
      });
    } catch (error) {
      set((state) => {
        state.isLoadingUser = false;
      });
      throw error;
    }
  },
});
