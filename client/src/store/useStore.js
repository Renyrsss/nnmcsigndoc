import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      userData: {
        fio: '',
        iin: '',
        phone: '+7 ',
      },
      
      isFormCompleted: false,
      isDocumentRead: false,
      language: 'ru',
      isLoading: false,
      userPhoto: '',
      signature: '',
      currentDocument: null,
      
      setUserData: (data) => set((state) => ({
        userData: { ...state.userData, ...data }
      })),
      
      setFormCompleted: (value) => set({ isFormCompleted: value }),
      setDocumentRead: (value) => set({ isDocumentRead: value }),
      setLanguage: (lang) => set({ language: lang }),
      setLoading: (value) => set({ isLoading: value }),
      setUserPhoto: (photo) => set({ userPhoto: photo }),
      setSignature: (sig) => set({ signature: sig }),
      setCurrentDocument: (doc) => set({ currentDocument: doc }),
      
      validateForm: () => {
        const { userData } = get();
        return (
          userData.fio.trim().length > 0 &&
          userData.iin.trim().length >= 12 &&
          userData.phone.trim().length >= 10
        );
      },
      
      reset: () => set({
        userData: {
          fio: '',
          iin: '',
          phone: '+7 ',
        },
        isFormCompleted: false,
        isDocumentRead: false,
        userPhoto: '',
        signature: '',
        currentDocument: null,
      }),
    }),
    {
      name: 'document-signing-storage',
      partialize: (state) => ({ language: state.language }),
    }
  )
);

export default useStore;
