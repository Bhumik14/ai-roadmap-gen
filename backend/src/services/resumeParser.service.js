import { PDFParse } from "pdf-parse";

export async function extract_text_resume(file){
    const pdfData = await PDFParse(file);
    const resumeText = pdfData.text;
    return resumeText;
}
