import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LanguageSelector from '../components/LanguageSelector';
import config from '../config';

/**
 * Главная страница - форма ввода данных пользователя
 */
const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userData, setUserData, setFormCompleted, validateForm } = useStore();
  const [alert, setAlert] = useState(null);
  
  // Обработчик изменения полей
  const handleChange = useCallback((field) => (e) => {
    setUserData({ [field]: e.target.value });
  }, [setUserData]);
  
  // Валидация и переход к документу
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Определяем какое поле не заполнено
      let message = t('alertField') || 'Пожалуйста, заполните все обязательные поля';
      
      if (!userData.fio.trim()) {
        message = t('fillFio') || 'Введите ФИО';
      } else if (userData.iin.trim().length < config.VALIDATION.IIN_LENGTH) {
        message = t('fillIin') || 'ИИН должен содержать 12 цифр';
      } else if (userData.phone.trim().length < config.VALIDATION.MIN_PHONE_LENGTH) {
        message = t('fillPhone') || 'Введите корректный номер телефона';
      } else if (!userData.email.includes('@')) {
        message = t('alertEmail') || 'Введите корректный email';
      }
      
      setAlert({ message, type: 'warning' });
      return;
    }
    
    setFormCompleted(true);
    navigate('/document');
  }, [validateForm, userData, t, setFormCompleted, navigate]);
  
  return (
    <Layout>
      <div className="isolate px-6 py-16 lg:px-8">
        {/* Уведомление */}
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        
        {/* Заголовок */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('sign') || 'Подписание документа'}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('fillForm') || 'Заполните форму для подписания документа'}
          </p>
        </div>
        
        {/* Форма */}
        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl">
          {/* Выбор языка */}
          <LanguageSelector />
          
          {/* Поля формы */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              label={t('fio') || 'ФИО'}
              name="fio"
              value={userData.fio}
              onChange={handleChange('fio')}
              placeholder="Иванов Иван Иванович"
              required
              className="sm:col-span-2"
            />
            
            <Input
              label={t('iin') || 'ИИН'}
              name="iin"
              type="text"
              inputMode="numeric"
              maxLength={12}
              value={userData.iin}
              onChange={handleChange('iin')}
              placeholder="123456789012"
              required
            />
            
            <Input
              label={t('phone') || 'Телефон'}
              name="phone"
              type="tel"
              value={userData.phone}
              onChange={handleChange('phone')}
              placeholder="+7 777 123 4567"
              required
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange('email')}
              placeholder="example@mail.com"
              required
              className="sm:col-span-2"
            />
            
            <Input
              label={t('address') || 'Адрес (опционально)'}
              name="address"
              value={userData.address}
              onChange={handleChange('address')}
              placeholder="г. Астана, ул. Примерная, 1"
              className="sm:col-span-2"
            />
          </div>
          
          {/* Кнопка продолжения */}
          <div className="mt-10">
            <Button type="submit" className="w-full sm:w-auto sm:mx-auto sm:block sm:px-8">
              {t('nextBtn1') || 'Продолжить'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default HomePage;
