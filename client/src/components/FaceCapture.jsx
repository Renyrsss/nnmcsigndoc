import { memo, useRef, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import Button from './Button';

const FaceCapture = memo(() => {
  const { t } = useTranslation();
  const { userPhoto, setUserPhoto } = useStore();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  
  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const startCamera = useCallback(async () => {
    try {
      setError('');
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user', 
          width: { ideal: 640 }, 
          height: { ideal: 480 } 
        },
        audio: false,
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsStreaming(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setError(t('cameraNotAllowed'));
      } else if (err.name === 'NotFoundError') {
        setError(t('cameraNotFound'));
      } else {
        setError(t('cameraError'));
      }
    }
  }, [t]);
  
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);
  
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
  
  const removePhoto = useCallback(() => {
    setUserPhoto('');
  }, [setUserPhoto]);
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
        {t('photo')} <span className="text-red-500">*</span>
      </label>
      
      <div className="flex flex-col items-center gap-4">
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
        
        <canvas ref={canvasRef} className="hidden" />
        
        <div className="flex gap-3">
          {!userPhoto && !isStreaming && (
            <Button onClick={startCamera}>
              {t('startCamera')}
            </Button>
          )}
          
          {isStreaming && (
            <>
              <Button onClick={capturePhoto}>
                {t('takePhoto')}
              </Button>
              <Button variant="secondary" onClick={stopCamera}>
                {t('cancel')}
              </Button>
            </>
          )}
          
          {userPhoto && (
            <Button variant="secondary" onClick={removePhoto}>
              {t('retakePhoto')}
            </Button>
          )}
        </div>
        
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  );
});

FaceCapture.displayName = 'FaceCapture';

export default FaceCapture;
