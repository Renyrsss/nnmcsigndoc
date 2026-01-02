import { memo, useRef, useCallback } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import Button from './Button';
import './SignaturePad.css';

/**
 * Компонент для рисования подписи
 */
const SignaturePad = memo(() => {
  const { t } = useTranslation();
  const sigCanvas = useRef(null);
  const { signature, setSignature } = useStore();
  
  // Сохранить подпись
  const saveSignature = useCallback(() => {
    if (sigCanvas.current?.isEmpty()) {
      return;
    }
    
    const signatureData = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png');
    setSignature(signatureData);
  }, [setSignature]);
  
  // Очистить подпись
  const clearSignature = useCallback(() => {
    sigCanvas.current?.clear();
    setSignature('');
  }, [setSignature]);
  
  // Обработчик окончания рисования
  const handleEnd = useCallback(() => {
    saveSignature();
  }, [saveSignature]);
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2 text-center">
        {t('drawSignature') || 'Нарисуйте свою подпись'} <span className="text-red-500">*</span>
      </label>
      
      <div className="flex flex-col items-center gap-4">
        {/* Холст для подписи */}
        <div className="border-2 border-gray-300 rounded-lg bg-white">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="blue"
            canvasProps={{
              width: 300,
              height: 140,
              className: 'sigCanvas',
            }}
            onEnd={handleEnd}
          />
        </div>
        
        {/* Превью сохранённой подписи */}
        {signature && (
          <div className="text-sm text-green-600 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {t('signatureSaved') || 'Подпись сохранена'}
          </div>
        )}
        
        {/* Кнопка очистки */}
        <Button variant="secondary" onClick={clearSignature}>
          {t('clearSignature') || 'Очистить'}
        </Button>
      </div>
    </div>
  );
});

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;
