import jsPDF from 'jspdf';

export const downloadPDF = async (roadmapData, formData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    const displayIndustry = formData.industry === 'Other' ? formData.customIndustry : formData.industry;
    
    let yPosition = margin;
    
    // Helper function to check if we need a new page
    const checkNewPage = (requiredHeight = 20) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };
    
    // Helper function to add text with word wrapping
    const addText = (text, fontSize = 10, fontStyle = 'normal', color = [0, 0, 0], maxWidth = null) => {
      if (!text || text.trim() === '') return;
      
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      pdf.setTextColor(color[0], color[1], color[2]);
      
      const width = maxWidth || contentWidth;
      const lines = pdf.splitTextToSize(text, width);
      const lineHeight = fontSize * 0.4;
      
      checkNewPage(lines.length * lineHeight + 5);
      
      lines.forEach(line => {
        if (line.trim()) {
          pdf.text(line, margin, yPosition);
          yPosition += lineHeight;
        }
      });
      
      yPosition += 3; // Extra spacing after text
    };
    
    // Helper function to add a table with better formatting
    const addTable = (headers, rows, title = '') => {
      if (!headers || !rows || headers.length === 0 || rows.length === 0) return;
      
      // Add table title if provided
      if (title) {
        addText(title, 11, 'bold', [0, 0, 0]);
        yPosition += 2;
      }
      
      const colWidth = contentWidth / headers.length;
      const rowHeight = 7;
      const headerHeight = 9;
      const maxCellWidth = colWidth - 4;
      
      // Calculate total table height
      let totalHeight = headerHeight;
      rows.forEach(row => {
        let maxRowHeight = rowHeight;
        row.forEach(cell => {
          const cellLines = pdf.splitTextToSize(String(cell || ''), maxCellWidth);
          const cellHeight = cellLines.length * 4 + 2;
          maxRowHeight = Math.max(maxRowHeight, cellHeight);
        });
        totalHeight += maxRowHeight;
      });
      
      checkNewPage(totalHeight + 10);
      
      const tableStartY = yPosition;
      
      // Draw header background
      pdf.setFillColor(240, 242, 247);
      pdf.rect(margin, yPosition, contentWidth, headerHeight, 'F');
      
      // Draw header border
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.rect(margin, yPosition, contentWidth, headerHeight);
      
      // Add header text
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      
      headers.forEach((header, index) => {
        const x = margin + (index * colWidth) + 2;
        const headerText = pdf.splitTextToSize(String(header || ''), maxCellWidth);
        pdf.text(headerText[0] || '', x, yPosition + 6);
      });
      
      yPosition += headerHeight;
      
      // Draw rows
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      
      rows.forEach((row, rowIndex) => {
        const rowStartY = yPosition;
        let maxRowHeight = rowHeight;
        
        // Calculate row height based on content
        row.forEach(cell => {
          const cellLines = pdf.splitTextToSize(String(cell || ''), maxCellWidth);
          const cellHeight = cellLines.length * 4 + 2;
          maxRowHeight = Math.max(maxRowHeight, cellHeight);
        });
        
        // Alternate row background
        if (rowIndex % 2 === 1) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(margin, yPosition, contentWidth, maxRowHeight, 'F');
        }
        
        // Add cell content
        row.forEach((cell, colIndex) => {
          const x = margin + (colIndex * colWidth) + 2;
          const cellText = pdf.splitTextToSize(String(cell || ''), maxCellWidth);
          
          cellText.forEach((line, lineIndex) => {
            if (line.trim()) {
              pdf.text(line, x, yPosition + 5 + (lineIndex * 4));
            }
          });
        });
        
        // Draw row border
        pdf.setDrawColor(220, 220, 220);
        pdf.rect(margin, yPosition, contentWidth, maxRowHeight);
        
        yPosition += maxRowHeight;
      });
      
      // Draw column separators
      pdf.setDrawColor(200, 200, 200);
      for (let i = 1; i < headers.length; i++) {
        const x = margin + (i * colWidth);
        pdf.line(x, tableStartY, x, yPosition);
      }
      
      yPosition += 8; // Space after table
    };
    
    // Helper function to extract and parse tables from HTML
    const extractTablesFromHTML = (htmlContent) => {
      const tables = [];
      
      // Create a temporary DOM element to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      const tableElements = tempDiv.querySelectorAll('table');
      
      tableElements.forEach(table => {
        const headers = [];
        const rows = [];
        
        // Extract headers
        const headerCells = table.querySelectorAll('thead th, tr:first-child th');
        headerCells.forEach(th => {
          headers.push(stripHtml(th.textContent || th.innerText || '').trim());
        });
        
        // Extract data rows
        const dataRows = table.querySelectorAll('tbody tr, tr:not(:first-child)');
        dataRows.forEach(tr => {
          const cells = tr.querySelectorAll('td');
          if (cells.length > 0) {
            const rowData = [];
            cells.forEach(td => {
              rowData.push(stripHtml(td.textContent || td.innerText || '').trim());
            });
            rows.push(rowData);
          }
        });
        
        // If no explicit headers found, try to extract from first row
        if (headers.length === 0 && rows.length > 0) {
          const firstRowCells = table.querySelectorAll('tr:first-child td');
          if (firstRowCells.length > 0) {
            firstRowCells.forEach(td => {
              headers.push(stripHtml(td.textContent || td.innerText || '').trim());
            });
            rows.shift(); // Remove first row as it's now headers
          }
        }
        
        if (headers.length > 0 && rows.length > 0) {
          tables.push({ headers, rows });
        }
      });
      
      return tables;
    };
    
    // Helper function to strip HTML tags and decode entities
    const stripHtml = (html) => {
      if (!html) return '';
      return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
    };
    
    // Helper function to extract headings and content
    const parseContentStructure = (htmlContent) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      const elements = [];
      const walker = document.createTreeWalker(
        tempDiv,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let node;
      while (node = walker.nextNode()) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName.toLowerCase();
          const text = stripHtml(node.textContent || '').trim();
          
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName) && text) {
            elements.push({
              type: 'heading',
              level: parseInt(tagName.charAt(1)),
              text: text
            });
          } else if (tagName === 'table') {
            // Skip tables as they're handled separately
            continue;
          } else if (['p', 'div', 'li'].includes(tagName) && text && text.length > 10) {
            elements.push({
              type: 'text',
              text: text
            });
          }
        }
      }
      
      return elements;
    };
    
    // Add title page
    pdf.setFontSize(24);
    pdf.setTextColor(59, 130, 246);
    pdf.text('Social Media Roadmap', pageWidth / 2, 40, { align: 'center' });
    
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`for ${formData.brandName}`, pageWidth / 2, 55, { align: 'center' });
    
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Industry: ${displayIndustry}`, pageWidth / 2, 70, { align: 'center' });
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 80, { align: 'center' });
    
    // Add brand overview
    yPosition = 100;
    addText('Brand Overview', 16, 'bold', [59, 130, 246]);
    addText(`Target Audience: ${formData.targetAudience}`, 10);
    addText(`Goals: ${formData.goals}`, 10);
    addText(`Experience Level: ${formData.experience || 'Not specified'}`, 10);
    
    yPosition += 10;
    
    // Process each module
    roadmapData.modules?.forEach((module, index) => {
      checkNewPage(40);
      
      // Module header
      addText(`Module ${index + 1}: ${module.title}`, 16, 'bold', [59, 130, 246]);
      yPosition += 5;
      
      if (!module.content) return;
      
      // Extract and add tables first
      const tables = extractTablesFromHTML(module.content);
      
      // Parse content structure for headings and text
      const contentElements = parseContentStructure(module.content);
      
      // Add content elements
      contentElements.forEach(element => {
        if (element.type === 'heading') {
          const fontSize = Math.max(14 - element.level, 10);
          addText(element.text, fontSize, 'bold', [0, 0, 0]);
        } else if (element.type === 'text') {
          addText(element.text, 9, 'normal', [0, 0, 0]);
        }
      });
      
      // Add tables
      tables.forEach((table, tableIndex) => {
        const tableTitle = tableIndex === 0 ? '' : `Table ${tableIndex + 1}`;
        addTable(table.headers, table.rows, tableTitle);
      });
      
      yPosition += 10; // Extra space between modules
    });
    
    // Add footer with page numbers
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      pdf.text(`${formData.brandName} - Social Media Roadmap`, margin, pageHeight - 10);
    }
    
    // Save the PDF
    pdf.save(`${formData.brandName}_Social_Media_Roadmap.pdf`);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};