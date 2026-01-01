import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import Layout from '../components/Layout';
import Button from '../components/Button';
import DocumentViewer from '../components/DocumentViewer';

/**
 * Страница просмотра документа перед подписанием
 */
const DocumentPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setDocumentRead } = useStore();
  
  // Переход к подписанию
  const handleContinue = useCallback(() => {
    setDocumentRead(true);
    navigate('/sign');
  }, [setDocumentRead, navigate]);
  
  // Вернуться к форме
  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);
  
  return (
    <Layout>
      <div className="px-6 py-16 lg:px-8">
        {/* Заголовок */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('readDocument') || 'Ознакомьтесь с документом'}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('readDocumentDesc') || 'Внимательно прочитайте документ перед подписанием'}
          </p>
        </div>
        
        {/* Документ */}
        <div className="mx-auto max-w-3xl">
          <DocumentViewer documentSlug="public-offer" />
          
          {/* Кнопки навигации */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button variant="secondary" onClick={handleBack}>
              {t('back') || 'Назад'}
            </Button>
            <Button onClick={handleContinue}>
              {t('sign') || 'Перейти к подписанию'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentPage;
