import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <Box textAlign="center" mt={4}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {[...Array(numPages)].map((_, index) => (
          <Page key={index} pageNumber={index + 1} width={600} />
        ))}
      </Document>
    </Box>
  );
}
