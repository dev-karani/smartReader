import * as fileService from "../services/fileService.js";
import { generateAudio } from "../services/ttsService.js";
import fs from "fs/promises";

export const uploadFile = async (req, res, next) => {
    let uploadedFilePath = null;
    let outputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        uploadedFilePath = req.file.path;

        // Extract and clean text
        const rawText = await fileService.extractText(uploadedFilePath);
        const cleanedText = fileService.cleanText(rawText);

        // Generate audio
        outputPath = await generateAudio(cleanedText);

        // Load audio
        const audioBuffer = await fs.readFile(outputPath);

        res.set({
            "Content-Type": "audio/wav",
            "Content-Length": audioBuffer.length,
        });

        res.send(audioBuffer);

        // Cleanup files after sending response
        setTimeout(async () => {
            try {
                if (uploadedFilePath) await fs.unlink(uploadedFilePath);
                if (outputPath) await fs.unlink(outputPath);
            } catch (cleanupError) {
                console.error("Cleanup error:", cleanupError);
            }
        }, 1000);

    } catch (error) {
        // Cleanup on error
        try {
            if (uploadedFilePath) await fs.unlink(uploadedFilePath);
            if (outputPath) await fs.unlink(outputPath);
        } catch (cleanupError) {
            console.error("Cleanup error:", cleanupError);
        }
        console.error("Upload error:", error);
        return res.status(500).json({ error: error.message });
    }
};
