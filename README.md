# Interactive 3D Developer Portfolio

Welcome to the source repository of my interactive full-stack developer portfolio. This project showcases my professional experience, education, certifications, and technical projects through a responsive, premium user interface enhanced by physics-based 3D animations.

👉 **Live Demo:** [https://nivedreddy6.github.io/Portfolio](https://github.com/Nivedreddy6/Portfolio) (or your hosting provider link)

---

## 🌟 Core Features

### 1. 🕸️ Interactive 3D Spider Web Background
* **3D Coordinate Projection:** A custom coordinate space projection canvas ($X, Y, Z$) that tilts and rotates smoothly in response to mouse coordinates.
* **Cursor-Attracting Web:** Real-time distance calculation draws glowing connection lines between floating stars and your mouse pointer.
* **Elastic Physics:** Nodes are gently pulled toward your cursor's 3D coordinates, creating a tactile, stretching rubber-band string effect.
* **Auto Color-Matching:** Queries computed CSS variables (`--accent-cyan`, `--accent-purple`) dynamically from the DOM so the web matches the website theme accent automatically.

### 2. 🖨️ Simulated PDF Reader & Print Engine
* **Browser-in-Browser Mockup:** Renders an simulated PDF viewer sheet showcasing career details, credentials, and interactive skill pill badges.
* **Pure CSS Print Mode:** Pressing the `Print` button hides the portfolio UI, formats the sheets as standard pages, and triggers the browser dialogue for a clean printout.

### 3. 🔍 Detailed Project Modal Popups
* Click-to-open glassmorphic detailed popups for projects (CRM, ATM, Library).
* Follows a structured project overview showcasing **Problem**, **Solution**, **Technologies Used**, and **Result** to impress recruiters.
* Safe propagation blocks preserve direct routing links (GitHub code, demo urls).

### 4. 🔀 3D Isometric Parallax Hero Graphic
* Interactive mouse-tilt bounds `perspective(1000px)` rotations to the hero graphic.
* Internal vector elements (racks, databases, code panels) float at different Z-depths using `translateZ` properties.

---

## 🛠️ Tech Stack

* **Build & Dev Env:** Vite, Node.js
* **Framework:** React 19
* **State Management:** Redux Toolkit
* **Networking:** Axios
* **Graphics:** HTML5 Canvas, SVG vectors, custom CSS Keyframes

---

## 🚀 Getting Started Locally

To run this repository locally on your computer:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nivedreddy6/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) or [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
