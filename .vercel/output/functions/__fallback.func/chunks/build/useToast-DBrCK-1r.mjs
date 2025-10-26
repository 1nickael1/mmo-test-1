import { K as Ke } from './server.mjs';

const useToast = () => {
  const showSuccess = (message, options) => {
    return Ke.success(message, {
      duration: 4e3,
      ...options
    });
  };
  const showError = (message, options) => {
    return Ke.error(message, {
      duration: 5e3,
      ...options
    });
  };
  const showInfo = (message, options) => {
    return Ke.info(message, {
      duration: 4e3,
      ...options
    });
  };
  const showWarning = (message, options) => {
    return Ke.warning(message, {
      duration: 4e3,
      ...options
    });
  };
  const showToast = (message, options) => {
    return Ke(message, {
      duration: 4e3,
      ...options
    });
  };
  const showConfirm = (title, message, onConfirm) => {
    return Ke(message, {
      duration: 0,
      // Não desaparece automaticamente
      action: {
        label: "Confirmar",
        onClick: onConfirm
      },
      cancel: {
        label: "Cancelar",
        onClick: () => {
        }
      }
    });
  };
  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showToast,
    showConfirm
  };
};

export { useToast as u };
//# sourceMappingURL=useToast-DBrCK-1r.mjs.map
