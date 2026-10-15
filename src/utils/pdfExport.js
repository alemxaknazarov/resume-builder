import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Universal High-Resolution WYSIWYG PDF Engine
 * Features:
 * - 1:1 screen visual fidelity (colors, borders, fonts, layout)
 * - Guaranteed icon & text horizontal inline alignment
 * - Preserves all clickable hyperlinks (LinkedIn, GitHub, Telegram, Demo, Phone, Mail)
 * - 2.5x retina pixel ratio (crisp 240+ DPI)
 * - Direct 1-click download without browser print dialog
 */
export async function downloadDirectPdf(elementOrId = 'resume-to-print', fileName = 'Resume') {
  const element = typeof elementOrId === 'string' 
    ? document.getElementById(elementOrId) 
    : elementOrId;

  if (!element) {
    throw new Error(`Element ${elementOrId} not found.`);
  }

  // Preserve initial styles
  const originalTransform = element.style.transform;
  const originalTransition = element.style.transition;
  const originalBoxShadow = element.style.boxShadow;

  // Temporarily reset preview zoom scale for 1:1 A4 rasterization
  element.style.transform = 'none';
  element.style.transition = 'none';
  element.style.boxShadow = 'none';

  try {
    // Brief delay to allow CSS reflow
    await new Promise((resolve) => setTimeout(resolve, 60));

    const containerRect = element.getBoundingClientRect();

    // Scan all hyperlinks and record relative coordinates (0 to 210mm, 0 to 297mm)
    const rawLinks = Array.from(element.querySelectorAll('a[href]'));
    const linkAnnotations = rawLinks
      .map((a) => {
        const rect = a.getBoundingClientRect();
        const href = a.getAttribute('href') || '';
        return {
          href,
          x: ((rect.left - containerRect.left) / containerRect.width) * 210,
          y: ((rect.top - containerRect.top) / containerRect.height) * 297,
          w: (rect.width / containerRect.width) * 210,
          h: (rect.height / containerRect.height) * 297,
        };
      })
      .filter((l) => l.href && (l.href.startsWith('http') || l.href.startsWith('mailto:') || l.href.startsWith('tel:')));

    // Render DOM using browser's native foreignObject SVG engine
    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2.5,
      cacheBust: true,
      backgroundColor: '#ffffff',
      filter: (node) => {
        if (node.classList && node.classList.contains('no-print')) {
          return false;
        }
        return true;
      },
    });

    // Create A4 PDF: 210mm x 297mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Draw the image exactly fitting the A4 page (no margins, no bleed)
    pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

    // Inject clickable hyperlink annotations
    linkAnnotations.forEach((link) => {
      pdf.link(link.x, link.y, link.w, link.h, { url: link.href });
    });

    const safeName = `${fileName ? fileName.trim().replace(/\s+/g, '_') : 'Resume'}.pdf`;
    pdf.save(safeName);
    return true;
  } finally {
    // Restore preview transform
    element.style.transform = originalTransform;
    element.style.transition = originalTransition;
    element.style.boxShadow = originalBoxShadow;
  }
}

/**
 * High-Precision Vector Print (Save as PDF)
 * Uses clean isolated iframe to guarantee:
 * - 100% Vector resolution (selectable text, crisp infinite zoom)
 * - Strict single-page A4 geometry (no blank 2nd page)
 * - Complete immunity to host UI scroll/zoom
 * - Icons and text strictly locked on the same baseline
 */
export function printVectorPdf(elementOrId = 'resume-to-print', fileName = 'Resume') {
  const element = typeof elementOrId === 'string' 
    ? document.getElementById(elementOrId) 
    : elementOrId;

  if (!element) {
    console.error(`Element ${elementOrId} not found.`);
    window.print();
    return;
  }

  // Remove existing print iframes if any
  const existingFrame = document.getElementById('proresume-isolated-print-frame');
  if (existingFrame) existingFrame.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'proresume-isolated-print-frame';
  iframe.style.position = 'fixed';
  iframe.style.top = '-9999px';
  iframe.style.left = '-9999px';
  iframe.style.width = '210mm';
  iframe.style.height = '297mm';
  iframe.style.border = 'none';
  iframe.style.zIndex = '-1';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow.document;

  // Extract all stylesheets and Google fonts
  const headStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n');

  const safeTitle = `${fileName ? fileName.trim().replace(/\s+/g, '_') : 'Resume'}_Resume`;

  iframeDoc.open();
  iframeDoc.write(`
    <!DOCTYPE html>
    <html lang="uz">
      <head>
        <meta charset="UTF-8">
        <title>${safeTitle}</title>
        ${headStyles}
        <style>
          @page {
            size: A4 portrait;
            margin: 0;
          }
          *, *::before, *::after {
            box-sizing: border-box;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .resume-paper {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            box-sizing: border-box !important;
            padding: 6mm 8mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            transform: none !important;
            background: #ffffff !important;
            overflow: hidden !important;
          }
          a {
            color: inherit !important;
            text-decoration: underline !important;
            text-underline-offset: 2px !important;
            cursor: pointer !important;
          }
          .avoid-break {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          /* Strict Icon + Text Same-Row Alignment */
          .icon-link,
          .icon-badge {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: flex-start !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            vertical-align: middle !important;
            line-height: 1 !important;
          }
          .icon-link svg,
          .icon-badge svg {
            display: inline-block !important;
            vertical-align: middle !important;
            flex-shrink: 0 !important;
          }
          .icon-link span,
          .icon-badge span,
          .icon-link a,
          .icon-badge a {
            display: inline-block !important;
            vertical-align: middle !important;
            line-height: 1.1 !important;
            white-space: nowrap !important;
          }
        </style>
      </head>
      <body>
        <div style="width: 210mm; height: 297mm; max-height: 297mm; overflow: hidden; margin: 0 auto; background: #ffffff;">
          ${element.innerHTML}
        </div>
      </body>
    </html>
  `);
  iframeDoc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (e) {
      console.error('Print iframe error:', e);
      window.print();
    } finally {
      setTimeout(() => {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 2500);
    }
  }, 350);
}
