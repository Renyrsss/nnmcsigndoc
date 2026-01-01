import { Navigate, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

/**
 * Защищённый маршрут
 * Проверяет, выполнены ли необходимые условия для доступа к странице
 */
const ProtectedRoute = ({ children, requireForm = false, requireDocument = false }) => {
  const location = useLocation();
  const { isFormCompleted, isDocumentRead, validateForm } = useStore();
  
  // Проверяем заполнение формы
  if (requireForm && !validateForm()) {
    // Перенаправляем на главную с сохранением намерения
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // Проверяем прочтение документа
  if (requireDocument && !isDocumentRead) {
    // Перенаправляем на страницу документа
    return <Navigate to="/document" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
