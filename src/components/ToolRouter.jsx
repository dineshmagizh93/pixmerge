import CompressPDF from './ToolPanels/CompressPDF';
import MergePDF from './ToolPanels/MergePDF';
import SplitPDF from './ToolPanels/SplitPDF';
import RotatePDF from './ToolPanels/RotatePDF';
import WatermarkPDF from './ToolPanels/WatermarkPDF';
import AddPageNumbers from './ToolPanels/AddPageNumbers';
import PDFToJPG from './ToolPanels/PDFToJPG';
import JPGToPDF from './ToolPanels/JPGToPDF';
import CropPDF from './ToolPanels/CropPDF';
import OrganizePDF from './ToolPanels/OrganizePDF';
import RemovePages from './ToolPanels/RemovePages';
import ExtractPages from './ToolPanels/ExtractPages';
import ExtractImages from './ToolPanels/ExtractImages';
import ExtractText from './ToolPanels/ExtractText';
import HTMLToPDF from './ToolPanels/HTMLToPDF';
import PDFToHTML from './ToolPanels/PDFToHTML';
import GrayscalePDF from './ToolPanels/GrayscalePDF';
import AddMargins from './ToolPanels/AddMargins';
import RepairPDF from './ToolPanels/RepairPDF';
import OCRPDF from './ToolPanels/OCRPDF';
import WordToPDF from './ToolPanels/WordToPDF';
import PowerPointToPDF from './ToolPanels/PowerPointToPDF';
import ExcelToPDF from './ToolPanels/ExcelToPDF';
import PDFToWord from './ToolPanels/PDFToWord';
import PDFToPowerPoint from './ToolPanels/PDFToPowerPoint';
import PDFToExcel from './ToolPanels/PDFToExcel';
import PDFToPDFA from './ToolPanels/PDFToPDFA';
import EditPDF from './ToolPanels/EditPDF';
import UnlockPDF from './ToolPanels/UnlockPDF';
import ProtectPDF from './ToolPanels/ProtectPDF';
import SignPDF from './ToolPanels/SignPDF';
import RedactPDF from './ToolPanels/RedactPDF';
import ComparePDF from './ToolPanels/ComparePDF';
import ToolLayout from './ToolLayout/ToolLayout';

const ToolRouter = ({ toolId }) => {
  const toolComponents = {
    'compress-pdf': CompressPDF,
    'merge-pdf': MergePDF,
    'split-pdf': SplitPDF,
    'rotate-pdf': RotatePDF,
    'add-watermark': WatermarkPDF,
    'add-page-numbers': AddPageNumbers,
    'pdf-to-jpg': PDFToJPG,
    'jpg-to-pdf': JPGToPDF,
    'crop-pdf': CropPDF,
    'organize-pdf': OrganizePDF,
    'remove-pages': RemovePages,
    'extract-pages': ExtractPages,
    'extract-images': ExtractImages,
    'extract-text': ExtractText,
    'html-to-pdf': HTMLToPDF,
    'pdf-to-html': PDFToHTML,
    'grayscale-pdf': GrayscalePDF,
    'add-margins': AddMargins,
    'repair-pdf': RepairPDF,
    'ocr-pdf': OCRPDF,
    'word-to-pdf': WordToPDF,
    'powerpoint-to-pdf': PowerPointToPDF,
    'excel-to-pdf': ExcelToPDF,
    'pdf-to-word': PDFToWord,
    'pdf-to-powerpoint': PDFToPowerPoint,
    'pdf-to-excel': PDFToExcel,
    'pdf-to-pdfa': PDFToPDFA,
    'edit-pdf': EditPDF,
    'unlock-pdf': UnlockPDF,
    'protect-pdf': ProtectPDF,
    'sign-pdf': SignPDF,
    'redact-pdf': RedactPDF,
    'compare-pdf': ComparePDF,
  };

  const ToolComponent = toolComponents[toolId];

  if (!ToolComponent) {
    return (
      <ToolLayout>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tool Coming Soon</h2>
          <p className="text-gray-600">
            This tool is currently under development. Please check back soon!
          </p>
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout>
      <ToolComponent />
    </ToolLayout>
  );
};

export default ToolRouter;

