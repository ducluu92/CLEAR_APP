import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import axios from "axios";
type Props = {
    pdfUrl: any;
};
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();
const PDFViewer = ({ pdfUrl }: Props) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    return (
        <div>
            <Document file={pdfUrl}>
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    );
};

export default PDFViewer;
