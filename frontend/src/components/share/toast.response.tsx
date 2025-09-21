import { motion, AnimatePresence } from "framer-motion";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export const RegisterSuccessToast = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 50 }} // bắt đầu lệch sang phải
          animate={{ opacity: 1, x: 0 }} // trượt về đúng vị trí
          exit={{ opacity: 0, x: 50 }} // biến mất sang phải
          transition={{ duration: 0.4 }}
          className="fixed top-5 right-5"
        >
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-semibold text-green-700">
              Account registration successful
            </div>
            <ToastToggle />
          </Toast>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const RegisterFailToast = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 50 }} // bắt đầu lệch sang phải
          animate={{ opacity: 1, x: 0 }} // trượt về đúng vị trí
          exit={{ opacity: 0, x: 50 }} // biến mất sang phải
          transition={{ duration: 0.4 }}
          className="fixed top-5 right-5"
        >
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-600 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-semibold text-red-700">
              Account registration failed
            </div>
            <ToastToggle />
          </Toast>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
