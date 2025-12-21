# Piper TTS Models

This directory contains Piper TTS model files. Due to their large size, the `.onnx` model files are not tracked in git.

## Required Models

The application requires at least one Piper TTS model. Currently configured models:

- `en_GB-semaine-medium.onnx` (~73 MB) - British English, medium quality
- `en_US-libritts-high.onnx` (~130 MB) - US English, high quality

## Downloading Models

You can download Piper models from:
- Official Piper repository: https://github.com/rhasspy/piper/releases
- Or use the Piper download script: `piper download --model en_GB-semaine-medium`

## Setup Instructions

1. Download the model files you need
2. Place the `.onnx` and `.onnx.json` files in this directory
3. Update `backend/src/services/ttsService.js` to point to your chosen model

The `.onnx.json` configuration files are tracked in git and should be included.

