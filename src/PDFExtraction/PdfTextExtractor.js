import React, { useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
    new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url,
    ).toString();

const PdfTextExtractor = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    // Define extract Text & onFileChange here
    const extractText = async (pdf) => {
        let extractedText = "";
        const numPages = pdf.numPages;

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            textContent.items.forEach((textItem) => {extractedText += textItem.str + " ";
            });
        }

        return extractedText;
    };

    const onFileChange = async (event) => {

        // Get the uploaded file
        const file = event.target.files[0];
        // Check if a file has been uploaded
        if (!file) {
            return;
        }
        // Check if the file is a PDF
        if (file.type !== "application/pdf") {
            setError("Only .pdf files are allowed");
            return;
        }
        // Clear any previous error messages
        setError("");
        // Read the file contents
        const reader = new FileReader();
        reader.onload = async (event) => {
            // Convert the file to a Uint8Array
            const typedarray = new Uint8Array(event.target.result);
            // Parse the PDF content
            const pdf = await pdfjs.getDocument({ data: typedarray })
                .promise;
            // Extract text from the PDF
            const extractedText = await extractText(pdf);
            // Update the component state with the extracted text
            setText(extractedText);
            // Log the extracted text to the console
            console.log("Extracted Text: ", extractedText);
        };

        // Read the file as an ArrayBuffer
        reader.readAsArrayBuffer(file);
    };

    return(
        <div>
            <input type="file" accept=".pdf" onChange={onFileChange} />

            {error && <div style={{color: "red" }}>{error}</div>}
            {text && (
                <div>
                    <h2>Text extracted from PDF:</h2>
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
};

export default PdfTextExtractor;