import axios from 'axios';
import useAdminStore from '../store/useAdminStore';

const API_URL = import.meta.env.VITE_API_URL || 'https://apps.nnmc.kz';

// Создаём axios instance
const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для добавления токена
adminApi.interceptors.request.use((config) => {
  const token = useAdminStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor для обработки ошибок
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAdminStore.getState().logout();
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Авторизация
export const authService = {
  async login(identifier, password) {
    const response = await adminApi.post('/api/auth/local', {
      identifier,
      password,
    });
    return response.data;
  },
  
  async getMe() {
    const response = await adminApi.get('/api/users/me');
    return response.data;
  },
};

// Подписанные документы
export const signaturesService = {
  async getAll(params = {}) {
    const { page = 1, pageSize = 10, search = '', startDate, endDate } = params;
    
    let filters = {};
    
    if (search) {
      filters = {
        $or: [
          { userName: { $containsi: search } },
          { userIIN: { $containsi: search } },
          { userPhone: { $containsi: search } },
        ],
      };
    }
    
    if (startDate) {
      filters.signedAt = { ...filters.signedAt, $gte: startDate };
    }
    
    if (endDate) {
      filters.signedAt = { ...filters.signedAt, $lte: endDate };
    }
    
    const response = await adminApi.get('/api/signed-documents', {
      params: {
        populate: '*',
        sort: 'signedAt:desc',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        filters,
      },
    });
    
    return response.data;
  },
  
  async getById(id) {
    const response = await adminApi.get(`/api/signed-documents/${id}`, {
      params: {
        populate: '*',
      },
    });
    return response.data;
  },
  
  async delete(id) {
    const response = await adminApi.delete(`/api/signed-documents/${id}`);
    return response.data;
  },
  
  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    // Получаем все записи для статистики
    const [total, todayCount, weekCount, monthCount] = await Promise.all([
      adminApi.get('/api/signed-documents', { params: { 'pagination[pageSize]': 1 } }),
      adminApi.get('/api/signed-documents', {
        params: {
          'pagination[pageSize]': 1,
          'filters[signedAt][$gte]': today.toISOString(),
        },
      }),
      adminApi.get('/api/signed-documents', {
        params: {
          'pagination[pageSize]': 1,
          'filters[signedAt][$gte]': weekAgo.toISOString(),
        },
      }),
      adminApi.get('/api/signed-documents', {
        params: {
          'pagination[pageSize]': 1,
          'filters[signedAt][$gte]': monthAgo.toISOString(),
        },
      }),
    ]);
    
    return {
      total: total.data.meta?.pagination?.total || 0,
      today: todayCount.data.meta?.pagination?.total || 0,
      week: weekCount.data.meta?.pagination?.total || 0,
      month: monthCount.data.meta?.pagination?.total || 0,
    };
  },
  
  async getChartData(days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const response = await adminApi.get('/api/signed-documents', {
      params: {
        'pagination[pageSize]': 1000,
        'filters[signedAt][$gte]': startDate.toISOString(),
        sort: 'signedAt:asc',
      },
    });
    
    // Группируем по дням
    const grouped = {};
    response.data.data?.forEach((item) => {
      const date = new Date(item.attributes.signedAt).toLocaleDateString('ru-RU');
      grouped[date] = (grouped[date] || 0) + 1;
    });
    
    // Создаём массив для графика
    const chartData = [];
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('ru-RU');
      chartData.push({
        date: dateStr,
        count: grouped[dateStr] || 0,
      });
    }
    
    return chartData;
  },
};

// Документы (формы согласия)
export const documentsService = {
  async getAll() {
    const response = await adminApi.get('/api/consent-forms', {
      params: {
        populate: '*',
      },
    });
    return response.data;
  },
  
  async getById(id) {
    const response = await adminApi.get(`/api/consent-forms/${id}`, {
      params: {
        populate: '*',
      },
    });
    return response.data;
  },
  
  async update(id, data) {
    const response = await adminApi.put(`/api/consent-forms/${id}`, { data });
    return response.data;
  },
  
  async create(data) {
    const response = await adminApi.post('/api/consent-forms', { data });
    return response.data;
  },
  
  async delete(id) {
    const response = await adminApi.delete(`/api/consent-forms/${id}`);
    return response.data;
  },
};

export default adminApi;
