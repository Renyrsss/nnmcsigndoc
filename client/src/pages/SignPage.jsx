import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pdf } from '@react-pdf/renderer';
import { Switch } from '@headlessui/react';
import useStore from '../store/useStore';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import FaceCapture from '../components/FaceCapture';
import SignaturePad from '../components/SignaturePad';
import PDFDocument from '../components/PDFDocument';
import { uploadService, signedDocumentsService, telegramService } from '../services/api';

const SignPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { 
    userData, 
    userPhoto, 
    signature, 
    language,
    currentDocument,
    isLoading,
    setLoading,
    reset 
  } = useStore();
  
  const [agreed, setAgreed] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const validate = useCallback(() => {
    if (!userPhoto) {
      setAlert({ message: t('photoRequired'), type: 'warning' });
      return false;
    }
    if (!signature) {
      setAlert({ message: t('signatureRequired'), type: 'warning' });
      return false;
    }
    if (!agreed) {
      setAlert({ message: t('agreeRequired'), type: 'warning' });
      return false;
    }
    return true;
  }, [userPhoto, signature, agreed, t]);
  
  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };
  
  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      const photoBlob = base64ToBlob(userPhoto, 'image/jpeg');
      const photoUpload = await uploadService.uploadFile(
        photoBlob, 
        `photo_${userData.iin}_${Date.now()}.jpg`
      );
      const userPhotoId = photoUpload[0]?.id;
      
      const pdfBlob = await pdf(
        <PDFDocument
          userData={userData}
          signature={signature}
          userPhoto={userPhoto}
          language={language}
        />
      ).toBlob();
      
      const pdfUpload = await uploadService.uploadFile(
        pdfBlob, 
        `signed_${userData.fio.trim().replace(/\s+/g, '_')}_${Date.now()}.pdf`
      );
      const signedFileId = pdfUpload[0]?.id;
      
      await signedDocumentsService.create({
        userName: userData.fio,
        userIIN: userData.iin,
        userPhone: userData.phone,
        consentFormId: currentDocument?.id || null,
        signedFileId: signedFileId,
        userPhotoId: userPhotoId,
      });
      
      await telegramService.sendNotification({
        fio: userData.fio,
        iin: userData.iin,
        phone: userData.phone,
        documentTitle: currentDocument?.attributes?.title,
      });
      
      setAlert({ message: t('success'), type: 'success' });
      
      setTimeout(() => {
        reset();
        navigate('/');
      }, 2500);
      
    } catch (error) {
      console.error('Submit error:', error);
      setAlert({ message: t('submitError'), type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [validate, userData, signature, userPhoto, currentDocument, language, t, setLoading, reset, navigate]);
  
  const handleBack = useCallback(() => {
    navigate('/document');
  }, [navigate]);
  
  return (
    <Layout>
      {isLoading && <Loading message={t('sending')} />}
      
      <div className="px-6 py-16 lg:px-8">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('sign')}
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('signDesc')}
          </p>
        </div>
        
        <div className="mx-auto max-w-xl">
          <FaceCapture />
          <SignaturePad />
          
          <div className="flex items-center gap-4 mb-8">
            <Switch
              checked={agreed}
              onChange={setAgreed}
              className={`
                ${agreed ? 'bg-indigo-600' : 'bg-gray-200'}
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full
                border-2 border-transparent transition-colors duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
              `}
            >
              <span className="sr-only">Agree to terms</span>
              <span
                aria-hidden="true"
                className={`
                  ${agreed ? 'translate-x-5' : 'translate-x-0'}
                  pointer-events-none inline-block h-5 w-5 transform rounded-full
                  bg-white shadow ring-0 transition duration-200 ease-in-out
                `}
              />
            </Switch>
            <span className="text-sm text-gray-600">
              {t('agree')}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" onClick={handleBack}>
              {t('back')}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!agreed}
              variant={agreed ? 'primary' : 'disabled'}
            >
              {t('signDocument')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignPage;
