# Interactive 3D Developer Portfolio

<p align="left">
  <img src="https://img.shields.io/badge/React-18.3-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=FFD62B" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-Canvas_3D-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-Vanilla_&_Glassmorphism-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/EmailJS-REST_API-EA580C?style=flat-square&logo=mailgun&logoColor=white" alt="EmailJS" />
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/GitHub-Nivedreddy6%2FPortfolio-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
</p>

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

## 🛠️ Tools & Technologies Used in This Project

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,nodejs,npm,git,github,vscode" alt="Portfolio Tech Stack Icons" />
  </a>
</p>

### ⚛️ Frontend & UI Framework
| Technology | Logo / Icon | Role & Usage in This Project | Badge |
| :--- | :---: | :--- | :--- |
| **React 18** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="38" height="38" alt="React" /> | Core SPA component architecture, modal dialog states, and reactive tab routing (`useState`, `useEffect`, `useRef`). | ![React](https://img.shields.io/badge/React_18.3-20232A?style=flat-square&logo=react&logoColor=61DAFB) |
| **JavaScript (ES6+)** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="38" height="38" alt="JavaScript" /> | Application logic, 3D vector & trigonometric math projection for canvas particles, and DOM interactions. | ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **HTML5 & Canvas API** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="38" height="38" alt="HTML5" /> | Semantic DOM document markup and dynamic 2D/3D hardware-accelerated Canvas rendering for spider-web particle physics. | ![HTML5](https://img.shields.io/badge/HTML5-Canvas_3D-E34F26?style=flat-square&logo=html5&logoColor=white) |
| **CSS3 / Vanilla CSS** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="38" height="38" alt="CSS3" /> | Custom design system, Glassmorphism, 3D card tilt transformations, keyframe glow animations, and `@media print` rules. | ![CSS3](https://img.shields.io/badge/CSS3-Vanilla_&_Glassmorphism-1572B6?style=flat-square&logo=css3&logoColor=white) |
| **SVG Vectors** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-plain.svg" width="38" height="38" alt="SVG" /> | Scalable isometric illustrations, animated mechanical gears, floating servers, and interactive radar radar-charts. | ![SVG](https://img.shields.io/badge/SVG-Vector_Graphics-FF9900?style=flat-square&logo=svg&logoColor=white) |

### 🔌 External APIs & Services
| Service | Logo / Icon | Role & Usage in This Project | Badge |
| :--- | :---: | :--- | :--- |
| **EmailJS REST API** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" width="38" height="38" alt="EmailJS" /> | Serverless contact form handling, sending immediate inbox notifications and automated recipient confirmations. | ![EmailJS](https://img.shields.io/badge/EmailJS-REST_API-EA580C?style=flat-square&logo=mailgun&logoColor=white) |

### 🛠️ Build Tools & Development Environment
| Tool | Logo / Icon | Role & Usage in This Project | Badge |
| :--- | :---: | :--- | :--- |
| **Vite 5** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vitejs/vitejs-original.svg" width="38" height="38" alt="Vite" /> | Lightning-fast development server with Hot Module Replacement (HMR) and optimized rollup production bundling. | ![Vite](https://img.shields.io/badge/Vite_5.4-646CFF?style=flat-square&logo=vite&logoColor=FFD62B) |
| **Node.js** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="38" height="38" alt="Node.js" /> | Local JavaScript runtime environment executing dev scripts and build automation pipelines. | ![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white) |
| **npm** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg" width="38" height="38" alt="npm" /> | Project package management, script execution (`dev`, `build`, `preview`), and dependency resolution. | ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) |
| **Git** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" width="38" height="38" alt="Git" /> | Local distributed version control system tracking codebase history and branching. | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) |
| **GitHub** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" width="38" height="38" alt="GitHub" /> | Remote repository hosting, project tracking, and web deployment. | ![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat-square&logo=github&logoColor=white) |
| **VS Code** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" width="38" height="38" alt="VS Code" /> | Primary source code editor with JSX syntax tooling, linting, and workspace extensions. | ![VS Code](https://img.shields.io/badge/VS_Code-Editor-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white) |


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
