import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Box, Button, Typography } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  /*const handleOpenPdf = () => {
    const url = `${window.location.origin}${cleanedPath}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };*/

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

/* <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <Typography mt={2}>
        Page {pageNumber} of {numPages}
      </Typography>
      <Box mt={2} display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" onClick={() => setPageNumber((p) => Math.max(p - 1, 1))} disabled={pageNumber <= 1}>
          Previous
        </Button>
        <Button variant="contained" onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))} disabled={pageNumber >= numPages}>
          Next
        </Button>
      </Box> */
