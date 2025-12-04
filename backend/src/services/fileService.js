//service/fileservice.js
import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import { readFile as readDocx } from "docx-parser";

//1.detect file type
function getFileType(filePath){
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.pdf') return "pdf";
    if (ext === ".docx") return "docx";
    if (ext === ".txt") return "txt";
    return "unknown";
}

//2/extract type
export async function extractText(filePath) {
    const fileType = getFileType(filePath);

    switch (fileType){
        case "pdf":
            return extractPdf(filePath);
        case "docx":
            return extractDocx(filePath);
        case "txt":
            return extractTxt(filePath);
        default:
            throw new Error("Unsupported filetype");
    }
}

//pdf parse
async function extractPdf(filePath){
    const fileBuffer = await fs.readFile(filePath);
    const data = await pdfParse(fileBuffer);
    return data.text;
}

// Docx parse
async function extractDocx(filePath){
    const text = await readDocx(filePath);
    return text;
}

//txt
async function extractTxt(filePath){
    const text = await fs.readFile(filePath, "utf8");
    return text;
}

//3.clean text
export function cleanText(text){
    return text
        .replace(/\r/g, "")
        .replace(/\n{2,}/g, "\n")
        .replace(/[^\S\r\n]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
}
