import { useState, useEffect, useCallback } from 'react';

     interface ToastMessage {
       id: string;
       message: string;
       type: 'success' | 'error';
     }

     let toastId = 0;
     let addToastFn: ((message: string, type: 'success' | 'error') => void) | null = null;

     export function showToast(message: string, type: 'success' | 'error' = 'success') {
       if (addToastFn) {
         addToastFn(message, type);
       }
     }

     export function Toast({ toasts, removeToast }: { toasts: ToastMessage[]; removeToast: (id: string) => void }) {
       return (
         <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
           {toasts.map((toast) => (
             <div
               key={toast.id}
               className={`px-4 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 animate-slide-in ${
                 toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
               }`}
               onClick={() => removeToast(toast.id)}
             >
               {toast.message}
             </div>
           ))}
         </div>
       );
     }

     export function useToast() {
       const [toasts, setToasts] = useState<ToastMessage[]>([]);

       const addToast = useCallback((message: string, type: 'success' | 'error') => {
         const id = String(++toastId);
         setToasts((prev) => [...prev, { id, message, type }]);
         setTimeout(() => {
           setToasts((prev) => prev.filter((t) => t.id !== id));
         }, 3000);
       }, []);

       const removeToast = useCallback((id: string) => {
         setToasts((prev) => prev.filter((t) => t.id !== id));
       }, []);

       useEffect(() => {
         addToastFn = addToast;
         return () => {
           addToastFn = null;
         };
       }, [addToast]);

       return { toasts, addToast, removeToast };
     }
