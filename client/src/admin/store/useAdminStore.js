import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAdminStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      setAuth: (token, user) => set({
        token,
        user,
        isAuthenticated: true,
      }),
      
      logout: () => set({
        token: null,
        user: null,
        isAuthenticated: false,
      }),
      
      getToken: () => get().token,
    }),
    {
      name: 'admin-auth-storage',
    }
  )
);

export default useAdminStore;
