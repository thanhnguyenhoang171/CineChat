import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

type ToastType = "success" | "error";

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  addToast: (toast: { type: ToastType; message: string }) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = ({
    type,
    message,
  }: {
    type: ToastType;
    message: string;
  }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto remove sau 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <Toast>
                  <div
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      toast.type === "success"
                        ? "bg-green-600 text-green-200"
                        : "bg-red-600 text-red-200"
                    }`}
                  >
                    {toast.type === "success" ? (
                      <HiCheck className="h-5 w-5" />
                    ) : (
                      <HiX className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3 text-sm font-semibold">
                    {toast.message}
                  </div>
                </Toast>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};
