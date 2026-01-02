import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { signaturesService } from '../services/adminApi';

const SignatureDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const API_URL = import.meta.env.VITE_API_URL || 'https://apps.nnmc.kz';
  
  useEffect(() => {
    const loadSignature = async () => {
      try {
        const response = await signaturesService.getById(id);
        setSignature(response.data);
      } catch (error) {
        console.error('Error loading signature:', error);
        navigate('/admin/signatures');
      } finally {
        setLoading(false);
      }
    };
    
    loadSignature();
  }, [id, navigate]);
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
  const getFileUrl = (fileData) => {
    if (!fileData?.data?.attributes?.url) return null;
    return `${API_URL}${fileData.data.attributes.url}`;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!signature) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Подпись не найдена</p>
      </div>
    );
  }
  
  const attrs = signature.attributes || {};
  const pdfUrl = getFileUrl(attrs.signedFile);
  const photoUrl = getFileUrl(attrs.userPhoto);
  
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/signatures"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Детали подписи</h1>
            <p className="text-gray-500 mt-1">ID: {signature.id}</p>
          </div>
        </div>
        
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Скачать PDF
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Данные пользователя</h2>
          
          <div className="flex items-start gap-6 mb-6">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="User photo"
                className="w-24 h-24 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{attrs.userName || '-'}</h3>
              <p className="text-gray-500 mt-1">ИИН: {attrs.userIIN || '-'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Телефон</span>
              <span className="font-medium text-gray-900">{attrs.userPhone || '-'}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Дата подписания</span>
              <span className="font-medium text-gray-900">{formatDate(attrs.signedAt)}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Документ</span>
              <span className="font-medium text-gray-900">
                {attrs.consent_form?.data?.attributes?.title || 'Публичная оферта'}
              </span>
            </div>
            
            <div className="flex justify-between py-3">
              <span className="text-gray-500">Создано</span>
              <span className="font-medium text-gray-900">{formatDate(attrs.createdAt)}</span>
            </div>
          </div>
        </div>
        
        {/* PDF Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Подписанный документ</h2>
          
          {pdfUrl ? (
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <iframe
                src={pdfUrl}
                className="w-full h-[600px]"
                title="PDF Preview"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>PDF документ не найден</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatureDetailPage;
