# Singapore AI Compliance Workbench (MVP)

A lightweight, browser-native tool for assessing AI Agents against the **Singapore Model AI Governance Framework for Agentic AI (2026)**.

## 🚀 Deployment Options

### Option 1: Static Web Hosting (Vercel / Netlify / GitHub Pages)
**Status: READY ✅**
Since this project uses pure ES Modules and CDN libraries:
1.  Upload this folder to GitHub.
2.  Connect to Vercel/Netlify.
3.  Set the **Publish Directory** to `.` (root).
4.  Deploy. No build command needed.

### Option 2: Docker / On-Prem
**Status: READY ✅**
Ideal for internal company networks.

1.  **Build Image**:
    ```bash
    docker build -t ai-compliance-workbench .
    ```
2.  **Run Container**:
    ```bash
    docker run -d -p 8080:80 ai-compliance-workbench
    ```
3.  Access at `http://localhost:8080`.

## ⚠️ Important Note on "Offline" Mode
This MVP currently relies on **CDNs** for Vue.js and Tailwind CSS (`unpkg.com`, `cdn.tailwindcss.com`) to keep the codebase simple (no node_modules).
*   **For Public Internet Deployment**: This is fine.
*   **For Air-Gapped/High-Security Banks**: You would need to download these 2 `.js` files and save them locally in `js/libs/`, then update `index.html` to reference the local files instead of the URLs.
