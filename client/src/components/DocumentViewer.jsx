import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import { consentFormsService } from '../services/api';

/**
 * Компонент для отображения документа
 * Документ загружается из Strapi по slug
 */
const DocumentViewer = memo(({ documentSlug = 'public-offer' }) => {
  const { t } = useTranslation();
  const { language, userData, currentDocument, setCurrentDocument } = useStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Загружаем документ при монтировании
  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      setError('');
      
      try {
        const doc = await consentFormsService.getBySlug(documentSlug);
        
        if (doc) {
          setCurrentDocument(doc);
        } else {
          setError('Документ не найден. Используется версия по умолчанию.');
        }
      } catch (err) {
        console.error('Error loading document:', err);
        setError('Ошибка загрузки документа. Используется версия по умолчанию.');
      } finally {
        setLoading(false);
      }
    };
    
    loadDocument();
  }, [documentSlug, setCurrentDocument]);
  
  // Подстановка данных пользователя в текст документа
  const replaceUserData = (text) => {
    if (!text) return '';
    return text
      .replace(/\{fio\}/g, userData.fio || '_______________')
      .replace(/\{iin\}/g, userData.iin || '_______________')
      .replace(/\{phone\}/g, userData.phone || '_______________')
      .replace(/\{email\}/g, userData.email || '_______________')
      .replace(/\{address\}/g, userData.address || '_______________')
      .replace(/\{date\}/g, new Date().toLocaleDateString('ru-RU'));
  };
  
  // Получить контент по языку
  const getContentByLanguage = () => {
    if (!currentDocument?.attributes) return null;
    
    const attrs = currentDocument.attributes;
    
    switch (language) {
      case 'kz':
        return attrs.contentKz || attrs.contentRu;
      case 'en':
        return attrs.contentEn || attrs.contentRu;
      default:
        return attrs.contentRu;
    }
  };
  
  // Fallback документ если Strapi не отвечает
  const getFallbackContent = () => {
    const fallbackTitle = {
      ru: 'ИНФОРМИРОВАННОЕ ДОБРОВОЛЬНОЕ СОГЛАСИЕ ПАЦИЕНТА НА ОКАЗАНИЕ МЕДИЦИНСКИХ УСЛУГ',
      kz: 'МЕДИЦИНАЛЫҚ ҚЫЗМЕТ КӨРСЕТУГЕ ПАЦИЕНТТІҢ АҚПАРАТТАНДЫРЫЛҒАН ЕРКІН КЕЛІСІМІ',
      en: 'PATIENT INFORMED CONSENT FOR MEDICAL SERVICES',
    };
    
    const fallbackContent = {
      ru: `
        <p>Я, <strong>${userData.fio || '_______________'}</strong>, ИИН <strong>${userData.iin || '_______________'}</strong>, 
        Контактный телефон <strong>${userData.phone || '_______________'}</strong></p>
        
        <p>Я информирован(а), о том, что специалисты амбулаторно-консультативного центра 
        ТОО «MEXEL HEALTH» приложат все условия для оказания мне высококвалифицированной 
        медицинской помощи.</p>
        
        <p>Я ознакомлен(а) и принимаю условия договора публичной оферты по предоставлению 
        платных медицинских услуг.</p>
        
        <p>Я даю добровольное согласие на включение и использование своих персональных данных 
        в информационных системах ТОО «MEXEL HEALTH» и Министерства здравоохранения 
        Республики Казахстан.</p>
        
        <p>Я согласен(-а) в пользу платного лечения, и добровольно отказываюсь от бесплатного 
        лечения в других клиниках.</p>
      `,
      kz: `
        <p>Мен: <strong>${userData.fio || '_______________'}</strong>, ЖСН <strong>${userData.iin || '_______________'}</strong>, 
        Байланыс телефоны <strong>${userData.phone || '_______________'}</strong></p>
        
        <p>«MEXEL HEALTH» ЖШС амбулаторлық-кеңес беру орталығының мамандары маған 
        жоғары білікті медициналық көмек көрсету үшін бар күш-жігерін салатыны туралы хабарландым.</p>
        
        <p>Мен ақылы медициналық қызметтерді көрсетуге арналған жария оферта шартының 
        талаптарын оқып шықтым және қабылдаймын.</p>
      `,
      en: `
        <p>I, <strong>${userData.fio || '_______________'}</strong>, IIN <strong>${userData.iin || '_______________'}</strong>, 
        Contact phone <strong>${userData.phone || '_______________'}</strong></p>
        
        <p>I am informed that the specialists of the outpatient advisory center of 
        MEXEL HEALTH LLP will make every effort to provide me with highly qualified medical care.</p>
        
        <p>I have read and accept the terms of the public offer agreement for the provision 
        of paid medical services.</p>
      `,
    };
    
    return {
      title: fallbackTitle[language] || fallbackTitle.ru,
      content: fallbackContent[language] || fallbackContent.ru,
    };
  };
  
  // Определяем что показывать
  const title = currentDocument?.attributes?.title || getFallbackContent().title;
  const rawContent = getContentByLanguage() || getFallbackContent().content;
  const content = replaceUserData(rawContent);
  
  return (
    <div className="mb-6 rounded-lg border-2 border-indigo-300 overflow-hidden">
      {/* Заголовок с аккордеоном */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900 text-left pr-4">
          {title}
        </h3>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Содержимое документа */}
      {isExpanded && (
        <div className="p-4 max-h-96 overflow-y-auto bg-white">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              {t('loadingDocument') || 'Загрузка документа...'}
            </div>
          ) : (
            <>
              {error && (
                <div className="text-center py-2 text-yellow-600 text-sm mb-4 bg-yellow-50 rounded">
                  {error}
                </div>
              )}
              
              <div 
                className="prose prose-sm max-w-none text-justify leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
});

DocumentViewer.displayName = 'DocumentViewer';

export default DocumentViewer;
