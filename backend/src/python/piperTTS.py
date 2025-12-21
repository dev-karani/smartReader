import subprocess
import sys
import os
import tempfile

# Get arguments
text = sys.argv[1]
output_path = sys.argv[2]
model_path = sys.argv[3]  # Passed from Node.js

# Create temporary text file
temp_path = None
try:
    with tempfile.NamedTemporaryFile(mode="w", delete=False, suffix=".txt", encoding="utf-8") as temp:
        temp.write(text)
        temp_path = temp.name
    # Run Piper
    result = subprocess.run([
        "piper",
        "--model", model_path,
        "--input_file", temp_path,
        "--output_file", output_path
    ], check=True, capture_output=True, text=True)
    
    print("DONE")
except subprocess.CalledProcessError as e:
    print(f"ERROR: {e.stderr}", file=sys.stderr)
    sys.exit(1)
finally:
    # Clean up temp file
    if temp_path and os.path.exists(temp_path):
        try:
            os.unlink(temp_path)
        except:
            pass