import { Trade } from '../types';                                                                                                   Context
     import { ThemeToggle } from './ThemeToggle';                                                                                        40,164 tokens
                                                                                                                                         20% used
     interface ReceiptPreviewProps {                                                                                                     $0.00 spent
       accountName: string;
       baseCurrency: string;                                                                                                             LSP
       startingBalance: number;                                                                                                          LSPs will activate as files are read
       trades: Trade[];
       theme: 'light' | 'dark';
       receiptRef: React.RefObject<HTMLDivElement | null>;
     }

     export function ReceiptPreview({
       accountName,
       baseCurrency,
       startingBalance,
       trades,
       theme,
       receiptRef
     }: ReceiptPreviewProps) {
       const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
       const commission = trades.length * 5;
       const swap = trades.reduce((sum, t) => sum + (Math.random() * 2 - 0.5), 0);
       const finalBalance = startingBalance + totalProfit - commission - swap;

       const isDark = theme === 'dark';
       const now = new Date();

       const formatCurrency = (value: number) => {
         return new Intl.NumberFormat('en-US', {
           style: 'currency',
           currency: baseCurrency,
           minimumFractionDigits: 2
         }).format(value);
       };

       const formatDateTime = (dateTimeStr: string) => {
         const date = new Date(dateTimeStr);                                                                                                                                              return date.toLocaleString('en-US', {
           month: 'short',
           day: 'numeric',
           hour: '2-digit',
           minute: '2-digit'
         });
       };

       return (
         <div className={`flex justify-center p-4 ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
           <div
             className={`w-full max-w-sm rounded-[2.5rem] p-3 ${                                                                                                                                isDark ? 'bg-slate-800' : 'bg-white'                                                                                                                                           } shadow-2xl`}
           >
             <div className="rounded-[2rem] overflow-hidden border-4 ${
               isDark ? 'border-slate-700' : 'border-slate-200'
             }">                                                                                                                                                                                <div
                 ref={receiptRef}
                 className={`${isDark ? 'bg-slate-900' : 'bg-white'} p-4`}
               >
                 <div className="flex items-center justify-between mb-4">
                   <div>
                     <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                       {accountName || 'Trading Account'}
                     </h2>
                     <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                       {now.toLocaleDateString('en-US', {
                         weekday: 'short',
                         month: 'short',
                         day: 'numeric',
                         year: 'numeric'
                       })}
                     </p>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="text-lg">📶</span>
                     <span className="text-lg">🔋</span>
                     <ThemeToggle theme={theme} compact />
                   </div>
                 </div>

                 <div className={`text-center py-3 rounded-xl mb-4 ${
                   isDark ? 'bg-slate-800' : 'bg-slate-50'
                 }`}>
                   <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                     Balance
                   </p>
                   <p className={`text-2xl font-bold ${
                     finalBalance >= startingBalance
                       ? (isDark ? 'text-emerald-400' : 'text-emerald-600')
                       : (isDark ? 'text-red-400' : 'text-red-600')
                   }`}>
                     {formatCurrency(finalBalance)}
                   </p>
                 </div>

                 <div className={`flex justify-between items-center py-2 border-b ${
                   isDark ? 'border-slate-700' : 'border-slate-200'
                 }`}>
                   <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                     History
                   </span>
                   <span className={`text-xs px-2 py-1 rounded-full ${
                     isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                   }`}>
                     {trades.length} trades
                   </span>
                 </div>

                 <div className="max-h-72 overflow-y-auto mt-2 space-y-2">
                   {trades.length === 0 ? (
                     <p className={`text-center py-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                       No trades yet
                     </p>
                   ) : (
                     trades.map((trade) => (
                       <div
                         key={trade.id}
                         className={`p-3 rounded-xl ${
                           isDark ? 'bg-slate-800' : 'bg-slate-50'
                         }`}
                       >                                                                                                            █
                         <div className="flex items-center justify-between mb-1">                                                   █
                           <div className="flex items-center gap-2">                                                                █
                             <span className={`text-xs font-bold px-2 py-0.5 rounded ${                                             █
                               trade.side === 'buy'                                                                                 █
                                 ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')              █
                                 : (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600')                              █
                             }`}>                                                                                                   ▀
                               {trade.side.toUpperCase()}
                             </span>
                             <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                               {trade.symbol}
                             </span>
                           </div>
                           <span className={`font-bold ${
                             trade.profit >= 0
                               ? (isDark ? 'text-emerald-400' : 'text-emerald-600')
                               : (isDark ? 'text-red-400' : 'text-red-600')
                           }`}>
                             {trade.profit >= 0 ? '+' : ''}{formatCurrency(trade.profit)}
                           </span>
                         </div>
                         <div className="flex items-center justify-between text-xs">
                           <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                             {trade.volume} lots @ {trade.entryPrice.toFixed(2)} → {trade.exitPrice.toFixed(2)}
                           </span>                                                                                                         ⬖ Getting started                ✕
                           <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                             {formatDateTime(trade.dateTime)}                                                                                OpenCode includes free models
                           </span>                                                                                                           so you can start immediately.
                         </div>
                       </div>                                                                                                                Connect from 75+ providers to
                     ))                                                                                                                      use other models, including
                   )}
                       </div>

                 <div className={`mt-4 pt-3 border-t space-y-2 ${
                   isDark ? 'border-slate-700' : 'border-slate-200'
                 }`}>
                   <div className="flex justify-between text-sm">
                     <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Deposit</span>
                     <span className={isDark ? 'text-white' : 'text-slate-800'}>
                       {formatCurrency(startingBalance)}
                     </span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Profit</span>
                     <span className={isDark ? 'text-white' : 'text-slate-800'}>
                       {formatCurrency(totalProfit)}
                     </span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Swap</span>
                     <span className={isDark ? 'text-red-400' : 'text-red-500'}>
                       -{formatCurrency(Math.abs(swap))}
                     </span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Commission</span>
                     <span className={isDark ? 'text-red-400' : 'text-red-500'}>
                       -{formatCurrency(commission)}
                     </span>
                   </div>
                   <div className={`flex justify-between text-base font-bold pt-2 border-t ${
                     isDark ? 'border-slate-700' : 'border-slate-200'
                   }`}>
                     <span className={isDark ? 'text-white' : 'text-slate-800'}>Balance</span>
                     <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>
                       {formatCurrency(finalBalance)}
                     </span>
                   </div>
                 </div>

                 <div className="mt-4 text-center">
                   <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                     Generated by Trading Receipt
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       );
     }
