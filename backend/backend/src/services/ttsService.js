import { spawn } from "child_process";
import { log } from "console";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to Python script
const pythonScript = path.join(__dirname, "../python/piperTTS.py");
// Alias to avoid ReferenceError if old log statements linger
const pythonScriptPath = pythonScript;

// Path to Piper model
const modelPath = path.join(__dirname, "../../piper_models/en_US-libritts-high.onnx");

export function generateAudio(text) {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(
            __dirname,
            `../../tmp/output_${Date.now()}.wav`
        );

        // Determine Python command based on platform
        const pythonCommand = process.platform === "win32" ? "py" : "python3";
        
        const python = spawn(pythonCommand, [
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

        python.on("error", (error) => {
            reject(new Error(`Failed to start Python process: ${error.message}`));
        });
        console.log("TTS input text length:", text.length);
        console.log("TTS python path:", pythonScript);
        console.log("TTS model path:", modelPath);

    });
}
