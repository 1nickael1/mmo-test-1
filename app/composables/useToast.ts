import { toast } from "vue-sonner";

export const useToast = () => {
  const showSuccess = (message: string, options?: any) => {
    return toast.success(message, {
      duration: 4000,
      ...options,
    });
  };

  const showError = (message: string, options?: any) => {
    return toast.error(message, {
      duration: 5000,
      ...options,
    });
  };

  const showInfo = (message: string, options?: any) => {
    return toast.info(message, {
      duration: 4000,
      ...options,
    });
  };

  const showWarning = (message: string, options?: any) => {
    return toast.warning(message, {
      duration: 4000,
      ...options,
    });
  };

  const showToast = (message: string, options?: any) => {
    return toast(message, {
      duration: 4000,
      ...options,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showToast,
  };
};
