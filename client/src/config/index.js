// API Configuration
// Все настройки в одном месте для легкого управления

const config = {
  // Strapi API
  API_BASE_URL: import.meta.env.VITE_API_URL || 'https://apps.nnmc.kz',
  
  // Endpoints
  ENDPOINTS: {
    UPLOAD: '/api/upload',
    CONSENT_FORMS: '/api/consent-forms',      // Коллекция форм согласия
    SIGNED_DOCUMENTS: '/api/signed-documents', // Коллекция подписанных документов
  },
  
  // Telegram Bot (опционально - можно отключить)
  TELEGRAM: {
    ENABLED: import.meta.env.VITE_TELEGRAM_ENABLED === 'true',
    // Токен должен храниться в .env файле, НЕ в коде
    TOKEN: import.meta.env.VITE_TELEGRAM_TOKEN || '',
    CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || '',
  },
  
  // Языки
  LANGUAGES: ['ru', 'kz', 'en'],
  DEFAULT_LANGUAGE: 'ru',
  
  // Валидация
  VALIDATION: {
    IIN_LENGTH: 12,
    MIN_PHONE_LENGTH: 10,
  }
};

export default config;
