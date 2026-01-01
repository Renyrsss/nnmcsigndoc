import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Основной store для данных пользователя и состояния приложения
const useStore = create(
  persist(
    (set, get) => ({
      // Данные пользователя
      userData: {
        fio: '',
        iin: '',
        phone: '+7 ',
        email: '',
        address: '',
      },
      
      // Состояние формы
      isFormCompleted: false,
      isDocumentRead: false,
      
      // Текущий язык
      language: 'ru',
      
      // Загрузка
      isLoading: false,
      
      // Фото пользователя (base64)
      userPhoto: '',
      
      // Подпись (base64)
      signature: '',
      
      // Текущий документ из Strapi
      currentDocument: null,
      
      // Actions
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
      
      // Валидация данных формы
      validateForm: () => {
        const { userData } = get();
        return (
          userData.fio.trim().length > 0 &&
          userData.iin.trim().length >= 12 &&
          userData.phone.trim().length >= 10 &&
          userData.email.trim().includes('@')
        );
      },
      
      // Сброс данных
      reset: () => set({
        userData: {
          fio: '',
          iin: '',
          phone: '+7 ',
          email: '',
          address: '',
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
      // Сохраняем только язык между сессиями
      partialize: (state) => ({ language: state.language }),
    }
  )
);

export default useStore;
