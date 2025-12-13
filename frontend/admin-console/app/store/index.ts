import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createAuthSlice, type AuthSlice } from '~/features/auth/auth.slice';

// Defintion of totlal store type
type BoundStore = AuthSlice;
// & DashboardSlice & UserSlice ... (adding more slices as needed)

export const useBoundStore = create<BoundStore>()(
  // Middleware Immer bao ngoài cùng để cấp quyền "mutate" cho state
  immer(
    // Middleware Persist bao bên trong để lưu dữ liệu vào LocalStorage
    persist(
      (...a) => ({
        // Rải (spread) các slice vào đây.
        // `...a` chính là [set, get, api] được truyền xuống slice con
        ...createAuthSlice(...a),

        // ...createDashboardSlice(...a),
      }),
      {
        name: 'admin-console-storage', // Tên key duy nhất trong LocalStorage
        storage: createJSONStorage(() => localStorage), // Mặc định là localStorage

        // Difinition specific state to persist
        partialize: (state) => ({
          // accessToken: state.accessToken,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
  ),
);