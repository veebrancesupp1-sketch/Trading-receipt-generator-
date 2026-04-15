interface ThemeToggleProps {
       theme: 'light' | 'dark';
       onToggle?: () => void;
       compact?: boolean;
     }

     export function ThemeToggle({ theme, onToggle, compact = false }: ThemeToggleProps) {
       const isDark = theme === 'dark';

       if (compact) {
         return (
           <button
             onClick={onToggle}
             className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
               isDark
                 ? 'bg-slate-700 text-yellow-400'
                 : 'bg-slate-200 text-slate-600'
             }`}
           >
             {isDark ? '☀️a' : '🌙'}
           </button>
         );
       }

       return (
         <button
           onClick={onToggle}
           className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
             isDark
               ? 'bg-slate-700 text-yellow-400'
               : 'bg-slate-200 text-slate-600'
           }`}
         >
           <span className="text-lg">{isDark ? '☀️ ' : '🌙'}</span>
           <span className="font-medium text-sm">{isDark ? 'Light' : 'Dark'}</span>
         </button>
       );
     }
