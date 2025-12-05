import * as fileService from "../services/fileService.js";
import { generateAudio } from "../services/ttsService.js";
import fs from "fs/promises";

export const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Extract and clean text
        const rawText = await fileService.extractText(req.file.path);
        const cleanedText = fileService.cleanText(rawText);

        // Generate audio
        const outputPath = await generateAudio(cleanedText);

        // Load audio
        const audioBuffer = await fs.readFile(outputPath);

        res.set({
            "Content-Type": "audio/wav",
            "Content-Length": audioBuffer.length,
        });

        return res.send(audioBuffer);

    } catch (error) {
        next(error);
    }
};
