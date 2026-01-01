import { memo, useEffect, useState } from 'react';

/**
 * Компонент для отображения уведомлений
 */
const Alert = memo(({ message, type = 'warning', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  if (!isVisible) return null;
  
  const styles = {
    warning: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
    success: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
    error: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
    info: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
  };
  
  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg fixed w-80 left-1/2 -translate-x-1/2 top-1/3 z-50 shadow-lg ${styles[type]}`}
      role="alert"
    >
      <p className="font-medium text-center">{message}</p>
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
