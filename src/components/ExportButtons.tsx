import html2canvas from 'html2canvas';                                                                                              LSPs will activate as files are read
     import jsPDF from 'jspdf';
     import { AppState } from '../types';
     import { getShareableUrl } from '../utils/serialization';
     import { showToast } from './Toast';

     interface ExportButtonsProps {
       receiptRef: React.RefObject<HTMLDivElement | null>;
       state: AppState;
     }                                                                                                                                                                           
     export function ExportButtons({ receiptRef, state }: ExportButtonsProps) {                                                                                                         const handleExportImage = async () => {
         if (!receiptRef.current) {                                                                                                                                                         showToast('Receipt not ready', 'error');
           return;
         }

         try {
           const element = receiptRef.current;
           const canvas = await html2canvas(element, {
             scale: 3,
             backgroundColor: state.theme === 'dark' ? '#0f172a' : '#ffffff',
             logging: false,
             useCORS: true
           });                                                                                                                                                                                                                                                                                                                                                               const link = document.createElement('a');
           const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
           link.download = `trading-receipt-${timestamp}.png`;
           link.href = canvas.toDataURL('image/png');
           link.click();                                                                                                                                                                                                                                                                                                                                                     showToast('Image downloaded!', 'success');
         } catch (error) {
           console.error('Export failed:', error);
           showToast('Export failed', 'error');
         }
       };

       const handleExportPDF = async () => {
         if (!receiptRef.current) {
           showToast('Receipt not ready', 'error');
           return;
         }

         try {
           const element = receiptRef.current;
           const canvas = await html2canvas(element, {
             scale: 3,
             backgroundColor: state.theme === 'dark' ? '#0f172a' : '#ffffff',
             logging: false,
             useCORS: true
           });

           const imgData = canvas.toDataURL('image/png');
           const pdf = new jsPDF({
             orientation: 'portrait',
             unit: 'mm',
             format: 'a4'
           });

           const pdfWidth = pdf.internal.pageSize.getWidth();
           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

           pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);

           const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
           pdf.save(`trading-receipt-${timestamp}.pdf`);

           showToast('PDF downloaded!', 'success');
         } catch (error) {
           console.error('PDF export failed:', error);
           showToast('PDF export failed', 'error');
         }
       };

       const handleGenerateLink = async () => {
         try {
           const url = getShareableUrl(state);
           await navigator.clipboard.writeText(url);
           showToast('Link copied to clipboard!', 'success');
         } catch {
           showToast('Failed to copy link', 'error');
         }
       };

       return (
         <div className="flex flex-wrap gap-2">
           <button
             onClick={handleExportImage}
             className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex
     items-center gap-2"
           >
             <span>📷</span> Image
           </button>
           <button
             onClick={handleExportPDF}
             className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-
     center gap-2"
           >
             <span>📄</span> PDF
           </button>
           <button
             onClick={handleGenerateLink}
             className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-
     center gap-2"
           >
             <span>🔗</span> Generate Link
           </button>                                                                                                                █
         </div>                                                                                                                     █
       );                                                                                                                           █
     }
