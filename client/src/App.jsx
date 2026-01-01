import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import './i18n';

// Ленивая загрузка страниц для оптимизации
const HomePage = lazy(() => import('./pages/HomePage'));
const DocumentPage = lazy(() => import('./pages/DocumentPage'));
const SignPage = lazy(() => import('./pages/SignPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading message="Загрузка..." />}>
        <Routes>
          {/* Главная - форма */}
          <Route path="/" element={<HomePage />} />
          
          {/* Просмотр документа - требует заполненной формы */}
          <Route
            path="/document"
            element={
              <ProtectedRoute requireForm>
                <DocumentPage />
              </ProtectedRoute>
            }
          />
          
          {/* Подписание - требует заполненной формы и прочтения документа */}
          <Route
            path="/sign"
            element={
              <ProtectedRoute requireForm requireDocument>
                <SignPage />
              </ProtectedRoute>
            }
          />
          
          {/* Все остальные маршруты -> главная */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
