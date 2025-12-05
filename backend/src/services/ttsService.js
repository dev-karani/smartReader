import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Python script
const pythonScript = path.join(__dirname, "../python/piperTTS.py");

// Path to Piper model
const modelPath = path.join(__dirname, "../../piper_models/en_GB-semaine-medium.onnx");

export function generateAudio(text) {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(
            __dirname,
            `../../tmp/output_${Date.now()}.wav`
        );

        const python = spawn("python", [
            pythonScript,
            text,
            outputPath,
            modelPath
        ]);

        python.stderr.on("data", (data) => {
            console.error("Piper Error:", data.toString());
        });

        python.on("close", (code) => {
            if (code === 0) {
                resolve(outputPath);
            } else {
                reject(new Error("Piper failed with code " + code));
            }
        });
    });
}
