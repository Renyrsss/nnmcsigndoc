import axios from 'axios';
import config from '../config';

// Создаём axios instance с базовым URL
const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Сервис для работы с формами согласия (consent-forms)
export const consentFormsService = {
  // Получить список всех активных форм
  async getAll() {
    try {
      const response = await api.get(config.ENDPOINTS.CONSENT_FORMS, {
        params: {
          'filters[isActive][$eq]': true,
          'populate': '*',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching consent forms:', error);
      throw error;
    }
  },
  
  // Получить форму по ID
  async getById(id) {
    try {
      const response = await api.get(`${config.ENDPOINTS.CONSENT_FORMS}/${id}`, {
        params: {
          'populate': '*',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching consent form:', error);
      throw error;
    }
  },
  
  // Получить форму по slug
  async getBySlug(slug) {
    try {
      const response = await api.get(config.ENDPOINTS.CONSENT_FORMS, {
        params: {
          'filters[slug][$eq]': slug,
          'filters[isActive][$eq]': true,
          'populate': '*',
        },
      });
      return response.data.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching consent form by slug:', error);
      throw error;
    }
  },
};

// Сервис для загрузки файлов
export const uploadService = {
  // Загрузить файл (PDF, фото)
  async uploadFile(file, fileName) {
    try {
      const formData = new FormData();
      formData.append('files', file, fileName);
      
      const response = await api.post(config.ENDPOINTS.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
};

// Сервис для сохранения подписанных документов
export const signedDocumentsService = {
  // Создать запись о подписанном документе
  async create(data) {
    try {
      const response = await api.post(config.ENDPOINTS.SIGNED_DOCUMENTS, {
        data: {
          userName: data.userName,
          userIIN: data.userIIN,
          userPhone: data.userPhone,
          userEmail: data.userEmail,
          consentForm: data.consentFormId, // ID формы согласия
          signedFile: data.signedFileId,   // ID загруженного PDF
          userPhoto: data.userPhotoId,     // ID загруженного фото
          signedAt: new Date().toISOString(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating signed document record:', error);
      throw error;
    }
  },
};

// Сервис для отправки в Telegram (опционально)
export const telegramService = {
  async sendNotification(data) {
    if (!config.TELEGRAM.ENABLED || !config.TELEGRAM.TOKEN) {
      console.log('Telegram notifications disabled');
      return;
    }
    
    const message = `
<b>📝 Новая подпись документа</b>

<b>ФИО:</b> ${data.fio}
<b>ИИН:</b> ${data.iin}
<b>Телефон:</b> ${data.phone}
<b>Email:</b> ${data.email}
<b>Документ:</b> ${data.documentTitle || 'Публичная оферта'}
<b>Дата:</b> ${new Date().toLocaleString('ru-RU')}
    `.trim();
    
    try {
      await axios.post(
        `https://api.telegram.org/bot${config.TELEGRAM.TOKEN}/sendMessage`,
        {
          chat_id: config.TELEGRAM.CHAT_ID,
          parse_mode: 'html',
          text: message,
        }
      );
    } catch (error) {
      console.error('Error sending Telegram notification:', error);
    }
  },
};

export default api;
