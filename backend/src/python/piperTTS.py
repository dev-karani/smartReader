import subprocess
import sys
import os
import tempfile

# Get arguments
text = sys.argv[1]
output_path = sys.argv[2]
model_path = sys.argv[3]  # Passed from Node.js

# Create temporary text file
with tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".txt") as temp:
    temp.write(text)
    temp_path = temp.name

# Run Piper
subprocess.run([
    "piper",
    "--model", model_path,
    "--input_file", temp_path,
    "--output_file", output_path
], check=True)

print("DONE")
