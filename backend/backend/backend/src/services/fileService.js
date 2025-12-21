// service/fileService.js
import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";

// Load CommonJS modules inside ES module
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const docxParser = require("docx-parser");
const readDocx = docxParser.readFile;

// 1. Detect file type
function getFileType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".pdf") return "pdf";
    if (ext === ".docx") return "docx";
    if (ext === ".txt") return "txt";
    return "unknown";
}

// 2. Extract text
export async function extractText(filePath) {
    const fileType = getFileType(filePath);

    switch (fileType) {
        case "pdf":
            return extractPdf(filePath);
        case "docx":
            return extractDocx(filePath);
        case "txt":
            return extractTxt(filePath);
        default:
            throw new Error(`Unsupported file type: ${fileType}`);
    }
}

// PDF parse
async function extractPdf(filePath) {
    const fileBuffer = await fs.readFile(filePath);
    const data = await pdfParse(fileBuffer);
    return data.text;
}

// DOCX parse
async function extractDocx(filePath) {
    return await readDocx(filePath);
}

// TXT parse
async function extractTxt(filePath) {
    return await fs.readFile(filePath, "utf8");
}

// 3. Clean text
export function cleanText(text) {
    return text
        .replace(/\r/g, "")
        .replace(/\n{2,}/g, "\n")
        .replace(/[^\S\r\n]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
}
