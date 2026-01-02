import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
import './i18n';

// Ленивая загрузка страниц для оптимизации
const HomePage = lazy(() => import('./pages/HomePage'));
const DocumentPage = lazy(() => import('./pages/DocumentPage'));
const SignPage = lazy(() => import('./pages/SignPage'));

// Админ-панель
const AdminLayout = lazy(() => import('./admin/components/AdminLayout'));
const AdminProtectedRoute = lazy(() => import('./admin/components/ProtectedRoute'));
const LoginPage = lazy(() => import('./admin/pages/LoginPage'));
const DashboardPage = lazy(() => import('./admin/pages/DashboardPage'));
const SignaturesPage = lazy(() => import('./admin/pages/SignaturesPage'));
const SignatureDetailPage = lazy(() => import('./admin/pages/SignatureDetailPage'));
const DocumentsPage = lazy(() => import('./admin/pages/DocumentsPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading message="Загрузка..." />}>
        <Routes>
          {/* ===== Публичная часть ===== */}
          
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
          
          {/* ===== Админ-панель ===== */}
          
          {/* Логин */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* Защищённые роуты админки */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="signatures" element={<SignaturesPage />} />
            <Route path="signatures/:id" element={<SignatureDetailPage />} />
            <Route path="documents" element={<DocumentsPage />} />
          </Route>
          
          {/* Все остальные маршруты -> главная */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
