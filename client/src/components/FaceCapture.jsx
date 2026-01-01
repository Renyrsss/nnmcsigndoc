import { memo, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import Button from './Button';

/**
 * Компонент для захвата фото с камеры
 */
const FaceCapture = memo(() => {
  const { t } = useTranslation();
  const { userPhoto, setUserPhoto } = useStore();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  
  // Запуск камеры
  const startCamera = useCallback(async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 300, height: 300 },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError(t('cameraError') || 'Не удалось получить доступ к камере');
    }
  }, [t]);
  
  // Остановка камеры
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);
  
  // Сделать фото
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const photoData = canvas.toDataURL('image/jpeg', 0.8);
    setUserPhoto(photoData);
    stopCamera();
  }, [setUserPhoto, stopCamera]);
  
  // Удалить фото
  const removePhoto = useCallback(() => {
    setUserPhoto('');
  }, [setUserPhoto]);
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
        {t('photo') || 'Ваше фото'} <span className="text-red-500">*</span>
      </label>
      
      <div className="flex flex-col items-center gap-4">
        {/* Превью фото или видео */}
        <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
          {userPhoto ? (
            <img
              src={userPhoto}
              alt="User photo"
              className="w-full h-full object-cover"
            />
          ) : isStreaming ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Скрытый canvas для захвата */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Кнопки управления */}
        <div className="flex gap-3">
          {!userPhoto && !isStreaming && (
            <Button onClick={startCamera}>
              {t('startCamera') || 'Включить камеру'}
            </Button>
          )}
          
          {isStreaming && (
            <>
              <Button onClick={capturePhoto}>
                {t('takePhoto') || 'Сделать фото'}
              </Button>
              <Button variant="secondary" onClick={stopCamera}>
                {t('cancel') || 'Отмена'}
              </Button>
            </>
          )}
          
          {userPhoto && (
            <Button variant="secondary" onClick={removePhoto}>
              {t('retakePhoto') || 'Переснять'}
            </Button>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
});

FaceCapture.displayName = 'FaceCapture';

export default FaceCapture;
