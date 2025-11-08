// toasts.js
import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 3000,            // tweak per type if you want
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const openErrorToaster = ({ message, options = {} }) =>
  toast.error(message, { ...defaultOptions, autoClose: 3000, ...options });

export const openSuccessToaster = ({ message, options = {} }) =>
  toast.success(message, { ...defaultOptions, autoClose: 2000, ...options });

export const openInfoToaster = ({ message, options = {} }) =>
  toast.info(message, { ...defaultOptions, autoClose: 5000, ...options });

export const openWarningToaster = ({ message, options = {} }) =>
  toast.warn(message, { ...defaultOptions, autoClose: 5000, ...options });

export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SETTLED: "settled",
  CANCELLED: "cancelled",
};

export default toast;
