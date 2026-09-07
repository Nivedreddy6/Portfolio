# 🌌 VisionOS Spatial Developer Portfolio

<p align="left">
  <img src="https://img.shields.io/badge/React-18.3-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=FFD62B" alt="Vite" />
  <img src="https://img.shields.io/badge/UI_Design-Apple_VisionOS_Spatial-818cf8?style=flat-square&logo=apple&logoColor=white" alt="VisionOS" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-Canvas_3D-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-Spatial_Glassmorphism-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/EmailJS-REST_API-EA580C?style=flat-square&logo=mailgun&logoColor=white" alt="EmailJS" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/GitHub-Nivedreddy6%2FPortfolio-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
</p>

Welcome to the official repository of my **Full Stack Developer Portfolio**, completely redesigned with an **Apple VisionOS / Spatial Computing UI**. This portfolio showcases my software engineering experience, MCA academic background, certifications, and technical projects through floating frosted glass windows in 3D perspective with cursor-following specular lighting.

👉 **Live Demo:** [https://nivedreddy6.github.io/Portfolio](https://github.com/Nivedreddy6/Portfolio)

---

## 🌟 Core Features & Spatial Architecture

### 1. 🛸 Floating VisionOS Navigation Dock (`SpatialDock.jsx`)
* **Frosted Glass Capsule:** Suspended at the top with `backdrop-filter: blur(32px)` and realistic light refraction borders.
* **Responsive Breakpoint Engine:**
  * **Desktop (≥ 1240px):** Full glass capsule dock with icons, labels, and active neon glows.
  * **Laptops (1041px – 1239px):** Proportional slim capsule ensuring 0% screen overflow.
  * **Tablets (769px – 1040px):** Minimalist VisionOS icon-only dock with native hover tooltips.
  * **Mobile (≤ 768px):** Clean header with brand pill and frosted glass slide-out drawer.

### 2. 🪞 3D Perspective Tilt & Specular Sheen (`SpatialCard.jsx`)
* **Hardware-Accelerated Tilt:** Cards calculate relative cursor vectors ($X, Y$) using `requestAnimationFrame` to apply smooth, realistic 3D perspective rotations (`perspective(1100px)`).
* **Specular Cursor Reflection:** A dynamic radial gradient glare effect follows mouse movement across glass surfaces, simulating physical light reflecting off curved glass.
* **Z-Axis Depth Layering:** Multi-level depth planes (`spatial-depth-1`, `spatial-depth-2`, `spatial-depth-3`) elevate text, buttons, and badges into 3D space.
* **Accessibility:** Full support for `prefers-reduced-motion` to smoothly disable tilt for users sensitive to motion.

### 3. 🪟 VisionOS Glass Windows & Ornaments
* **Frosted Window Chrome:** Cards and panels feature top-edge refraction highlights (`inset 0 1px 1.5px rgba(255, 255, 255, 0.3)`) and dark ambient occlusion shadows.
* **Window Ornaments & Badges:** Frosted glass window bars with macOS/VisionOS colored window control orbs (`close`, `minimize`, `maximize`) and glowing status badges.
* **Spatial Form Inputs:** Recessed frosted glass form controls with neon focus glow and floating labels.

### 4. 🕸️ Interactive 3D Spider Web Canvas
* **3D Coordinate Projection:** Hardware-accelerated canvas displaying an interactive 3D particle cloud that rotates in space with cursor coordinates.
* **Elastic Rubber-Band Physics:** Floating nodes are pulled toward the cursor with simulated elastic tension, connecting with glowing spider-web silk lines.
* **Theme-Aware Colors:** Automatically extracts computed CSS tokens (`--accent-cyan`, `--accent-purple`) from the document root.

### 5. 🔍 VisionOS Immersion Modals & Detailed Viewers
* **Frosted Blur Backdrop (`blur(36px)`):** Click-to-open immersive inspection modals for projects (CRM, ATM, Library) and verified institute certificates.
* **Structured Overviews:** Recruiter-tailored breakdowns highlighting **Problem**, **Solution**, **Technologies Used**, and **Measurable Results**.

### 6. ⚡ Glowing Energy Rail Timelines
* Experience and Education timelines connected by a vertical neon energy rail with pulsing nodes and elevated company glass capsules.

---

## 🛠️ Tools & Technologies

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,nodejs,npm,git,github,vscode" alt="Tech Stack Icons" />
  </a>
</p>

### ⚛️ Frontend & Spatial UI
| Technology | Role & Usage in This Project |
| :--- | :--- |
| **React 18** | SPA state management, modal controllers, dynamic component rendering, and custom hooks (`useState`, `useEffect`, `useRef`, `useCallback`). |
| **VisionOS Spatial UI** | Custom-engineered spatial computing design system featuring frosted glassmorphism, specular sheen, and 3D depth layering. |
| **HTML5 & Canvas API** | Semantic DOM structure and 3D particle network with real-time vector math and cursor tension physics. |
| **CSS3 / Vanilla CSS** | Custom design tokens, glassmorphism filters, hardware-accelerated 3D transforms, keyframe glows, and responsive media queries. |
| **SVG Vectors** | Interactive isometric graphics, circuit diagrams, mechanical gear animations, and skill radar panels. |

### 🔌 External APIs & Services
| Service | Role & Usage in This Project |
| :--- | :--- |
| **EmailJS REST API** | Direct serverless contact dispatch with dual routing (admin notification + sender auto-acknowledgment). |

### 🛠️ Build Tools & Workflow
| Tool | Role & Usage in This Project |
| :--- | :--- |
| **Vite 5** | Next-generation frontend tooling with instant Hot Module Replacement (HMR) and optimized Rollup production builds. |
| **Node.js** | JavaScript runtime executing dev servers, post-processing, and build pipelines. |
| **npm** | Package management and script orchestration (`dev`, `build`, `preview`). |
| **Git & GitHub** | Version control tracking codebase history and repository hosting. |

---

## 🚀 Getting Started Locally

To run this portfolio locally on your computer:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed.

### Installation & Run

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
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👨‍💻 Author

**Tamma Nived Reddy**  
*Full Stack Developer & MCA Graduate*  
- **GitHub:** [@Nivedreddy6](https://github.com/Nivedreddy6)  
- **LinkedIn:** [Tamma Nived Reddy](https://linkedin.com/in/nived-reddy-97a986257/)  
- **Email:** [nivedreddy6@gmail.com](mailto:nivedreddy6@gmail.com)
