import * as fileService from "../services/fileService.js";
import * as ttsService from "../services/ttsService.js";

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const rawText = await fileService.extractText(req.file.path);
    const cleanedText = fileService.cleanText(rawText);

    const audioBuffer = await ttsService.generateAudio({
      text: cleanedText,
      voice: "alloy",
      format: "mp3"
    });

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length,
    });

    return res.send(audioBuffer);
  } catch (error) {
    next(error);
  }
};
