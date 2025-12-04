import { PiperTTS } from "@microsoft/piper";
import fs from "fs";
import path from "path";

let piperInstance;

// 1. initialize piper once (to avoid loading model on every request)
const initPiper = async () => {
    if (!piperInstance) {
        const voiceModel = path.resolve("models/piper/en_US-amy-medium.onnx");

        if (!fs.existsSync(voiceModel)) {
            throw new Error("❌ Piper voice model not found: " + voiceModel);
        }

        piperInstance = new PiperTTS(voiceModel);
        await piperInstance.init();

        console.log("✔ Piper TTS initialized");
    }
};

// 2. generate audio buffer
export const generateAudio = async ({ text, voice, format = "mp3" }) => {
    await initPiper(); // ensure loaded only once

    if (!text || text.trim().length === 0) {
        throw new Error("No text provided for TTS");
    }

    // piper only outputs WAV → convert to MP3 using ffmpeg if needed
    const wavAudio = await piperInstance.say(text);

    if (format === "wav") {
        return wavAudio; // return raw wav buffer
    }

    // convert wav → mp3 using ffmpeg
    return await convertWavToMp3(wavAudio);
};

// 3. helper: convert wav → mp3 via ffmpeg
const convertWavToMp3 = async (wavBuffer) => {
    const { spawn } = await import("child_process");

    return new Promise((resolve, reject) => {
        const ffmpeg = spawn("ffmpeg", [
            "-f", "wav",
            "-i", "pipe:0",
            "-f", "mp3",
            "pipe:1"
        ]);

        let mp3Buffer = Buffer.alloc(0);

        ffmpeg.stdout.on("data", (chunk) => {
            mp3Buffer = Buffer.concat([mp3Buffer, chunk]);
        });

        ffmpeg.stderr.on("data", () => {}); // keep ffmpeg quiet

        ffmpeg.on("close", () => resolve(mp3Buffer));
        ffmpeg.on("error", reject);

        ffmpeg.stdin.write(wavBuffer);
        ffmpeg.stdin.end();
    });
};
