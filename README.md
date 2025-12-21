# Smart Reader (TTS)

**Smart Reader** is a text-to-speech application that converts written text into natural-sounding audio. It is designed as a practical, backend-focused project that demonstrates API design, external service integration, and production-oriented thinking.

The project prioritizes shipping a functional system first, with a clear roadmap for iteration and improvement.

---

## Features

* **Convert text input** into spoken audio
* **Voice selection support** (e.g., `en_GB-semaine-medium`)
* **Backend service abstraction** for TTS
* **File-based audio output**
* **Ready for integration** with frontend, desktop (Electron), or API consumers

---

## Architecture Overview

```text
backend/
 ├── src/
 │   ├── services/
 │   │   └── ttsService.js
 │   ├── routes/
 │   └── app.js
 ├── tests/
 └── package.json
```

##  Tech Stack

* **Runtime:** Node.js (v18+)
* **Framework:** Express
* **Language:** JavaScript (ES Modules)
* **TTS Engine:** External TTS API (Piper)
* **Utilities:** Axios, File system output

---

##  Getting Started

### Prerequisites
* Node.js v18+

### Installation
1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run a test conversion:**
    ```bash
    node tests/test.js
    ```
    *This will generate an audio file (`test.mp3`) in the output directory.*

---

##  Testing

Basic functional testing is implemented to validate:
* **TTS request handling**: Ensuring payloads are correctly formed.
* **Audio file generation**: Verifying file system writes.
* **Error handling paths**: Managing API failures gracefully.

> **Note:** Further automated tests are planned for V2.

---

##  Design Decisions

* **V1 Speed:** Shipped quickly to validate the end-to-end data flow.
* **Service-Oriented:** Logic is decoupled to allow for easy refactoring.
* **Deferred TypeScript:** Opted to implement TS only after runtime behavior was fully understood.
* **Extensibility:** Specifically designed to eventually support local TTS (Coqui) and desktop environments (Electron).

---

##  Roadmap (V2)

- [ ] Migrate backend to **TypeScript**
- [ ] Input validation with **Zod**
- [ ] Local TTS engine integration (**Coqui**)
- [ ] **Streaming** audio support
- [ ] **Electron** desktop client
- [ ] Improved test coverage

---

##  Why This Project

This project was built to:
1.  Practice real-world backend workflows.
2.  Integrate third-party services effectively.
3.  Focus on shipping, iteration, and system design.
4.  Reflect how production systems evolve over time.

**Status:** `v1 (functional)`  
**Next Step:** TypeScript + local TTS (Coqui)