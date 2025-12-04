import React, { useState } from "react";

export default function FileUpload() {
  const [audioURL, setAudioURL] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    const file = e.target.fileInput.files[0];

    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);

      setAudioURL(url);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Upload File → Convert to Audio</h2>

      <form onSubmit={handleUpload}>
        <input type="file" name="fileInput" accept=".txt,.pdf" />

        <button type="submit" disabled={loading}>
          {loading ? "Converting..." : "Upload"}
        </button>
      </form>

      {audioURL && (
        <div>
          <h3>Result:</h3>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
}
