import { useState, useEffect } from 'react';
import { documentsService, signaturesService } from '../services/adminApi';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [signatureCounts, setSignatureCounts] = useState({});
  
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const response = await documentsService.getAll();
        setDocuments(response.data || []);
        
        // Загружаем количество подписей для каждого документа
        const counts = {};
        for (const doc of response.data || []) {
          try {
            const sigResponse = await signaturesService.getAll({
              page: 1,
              pageSize: 1,
            });
            counts[doc.id] = sigResponse.meta?.pagination?.total || 0;
          } catch {
            counts[doc.id] = 0;
          }
        }
        setSignatureCounts(counts);
      } catch (error) {
        console.error('Error loading documents:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDocuments();
  }, []);
  
  const handleToggleActive = async (doc) => {
    try {
      await documentsService.update(doc.id, {
        isActive: !doc.attributes.isActive,
      });
      
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === doc.id
            ? { ...d, attributes: { ...d.attributes, isActive: !d.attributes.isActive } }
            : d
        )
      );
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ru-RU');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Документы</h1>
          <p className="text-gray-500 mt-1">Управление формами согласия</p>
        </div>
        
        <a
          href={`${import.meta.env.VITE_API_URL || 'https://apps.nnmc.kz'}/admin/content-manager/collection-types/api::consent-form.consent-form/create`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Добавить в Strapi
        </a>
      </div>
      
      {/* Documents Grid */}
      {documents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Нет документов</h3>
          <p className="text-gray-500">Создайте первый документ в Strapi</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {doc.attributes?.title || 'Без названия'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Slug: {doc.attributes?.slug || '-'}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      doc.attributes?.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {doc.attributes?.isActive ? 'Активен' : 'Выключен'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Создан: {formatDate(doc.attributes?.createdAt)}</span>
                  <span className="font-medium text-indigo-600">
                    {signatureCounts[doc.id] || 0} подписей
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(doc)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      doc.attributes?.isActive
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {doc.attributes?.isActive ? 'Выключить' : 'Включить'}
                  </button>
                  
                  <a
                    href={`${import.meta.env.VITE_API_URL || 'https://apps.nnmc.kz'}/admin/content-manager/collection-types/api::consent-form.consent-form/${doc.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Редактировать в Strapi"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900">Подсказка</h4>
            <p className="text-sm text-blue-700 mt-1">
              Для полного редактирования документов (текст, переводы) используйте панель администратора Strapi.
              Кнопка "Редактировать в Strapi" откроет документ в админке Strapi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
