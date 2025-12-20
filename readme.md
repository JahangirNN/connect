# ⚡ NextGen Developer Portfolios

A collection of high-performance, **single-file** HTML/CSS/JS portfolio templates for developers, engineers, and creatives. 

No frameworks, no build steps, no bloat. Just copy, paste, and deploy.

![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/tech-HTML%20%7C%20CSS%20%7C%20JS-blue)
![Size](https://img.shields.io/badge/size-%3C20kb-orange)

## 🎨 The Themes

This repository contains three distinct aesthetic engines designed for different developer personalities.

### 1. 🔮 The Modern Bento (Directory: `/bold`)
**Best for:** Full Stack Developers, UI/UX Designers, Product Engineers.
*   **Vibe:** Vercel/Linear style, Dark mode, Clean.
*   **Features:** Glassmorphism cards, CSS-only spotlight gradients, noise texture, and staggered reveal animations.
*   **Mobile:** Glass bottom navigation dock (iOS style).

### 2. 👾 The System Core (Directory: `/80's-console`)
**Best for:** Backend Engineers, Security Researchers, DevOps.
*   **Vibe:** Windows 95, The Matrix, Brutalism.
*   **Features:** Interactive "Matrix Rain" canvas (decrypts on mouse hover), typewriter text effects, glitch hover states, CRT scanlines.
*   **Font:** Monospaced courier aesthetics.

### 3. 🚀 The Warp Defense (Directory: `/index`)
**Best for:** Game Devs, AI Engineers, Creative Tech.
*   **Vibe:** Iron Man HUD, Elite Dangerous, Cyberpunk.
*   **Features:** **Fully playable background arcade game.** Ships fly autonomously on idle, or manual control takes over on mouse movement. Particle explosions, seeking missiles, and a high-tech neon UI.

---

## 🚀 Quick Start

1.  **Clone the repo** (or just download the file you want).
    ```bash
    git clone https://github.com/YOUR_USERNAME/portfolio-templates.git
    ```
2.  **Open the folder** of the theme you like.
3.  **Edit `index.html`** in any text editor.
    *   *Ctrl+F* for "Jahangir" and replace with your name.
    *   Update links to your GitHub/LinkedIn.
4.  **Deploy!**
    *   Drag and drop the `index.html` into **Netlify Drop** or **Vercel**.
    *   Or use **GitHub Pages** (Enable it in repo settings).

---

## 🛠️ Customization

Since these are single files, everything is located within the `<style>` and `<script>` tags in the HTML.

*   **Changing Colors:** Look for the `:root` variable block at the top of the CSS.
    ```css
    :root {
        --accent-color: #00fff2; /* Change this hex code */
    }
    ```
*   **Changing Content:** The layout uses a **Bento Grid** (`display: grid`). You can rearrange the cards by changing `grid-column: span 2` classes on the div elements.

---

## 🤝 Contributing

Got a cool idea for an animation? Found a bug on mobile?
1.  Fork the Project.
2.  Create your Feature Branch.
3.  Open a Pull Request.

---

## 📜 License

Distributed under the **MIT License**.

> **You are free to:**
> *   Use this for your personal portfolio.
> *   Use this for client work.
> *   Modify it however you want.
> *   *Attribution is appreciated but not required!*

---

*Engineered with ☕ by [Jahangir Nasirwala](https://github.com/JahangirNN)*