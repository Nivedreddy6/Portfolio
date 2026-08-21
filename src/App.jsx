import React, { useState, useEffect, useRef } from 'react';

function App() {
  const EMAILJS_SERVICE_ID = "service_n52ixxy";
  const EMAILJS_TEMPLATE_ID = "template_o19k00l"; // For Owner (Nived - Admin Notification HTML)
  const EMAILJS_CLIENT_TEMPLATE_ID = "template_joubdln"; // For Client (Sender - Thank You HTML)
  const EMAILJS_PUBLIC_KEY = "UJkbQRsAdqaXuc3bA";
  
  // --- States ---
  const [typedText, setTypedText] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);
  const [atmText, setAtmText] = useState('NEXUS BANK');
  
  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formState, setFormState] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificationsData = {
    python: {
      title: "Python Programming Certification",
      issuer: "Codegnan Training Institute",
      image: "/Python.png"
    },
    mysql: {
      title: "MySQL Database Specialist Certification",
      issuer: "Codegnan Training Institute",
      image: "/MySQL.png"
    },
    frontend: {
      title: "Frontend Development Certification",
      issuer: "Codegnan Training Institute",
      image: "/Frontend.png"
    }
  };

  const handleCopyLink = () => {
    const resumePath = `${window.location.origin}/Tamma_Nived_Reddy_Resume.pdf`;
    navigator.clipboard.writeText(resumePath);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };



  // Static data backing the project detailed display modal
  const projectsData = {
    crm: {
      title: "CRM Database System",
      problem: "Enterprise sales operations lacked centralized data models, resulting in redundant transactions, orphaned records, and slow query analytics latency.",
      solution: "Engineered a fully normalized relational schema built in 3NF layout. Implemented stored procedures, indexing keys, and triggers to automate data cleansing and transactional workflows.",
      technologies: ["MySQL", "SQL", "Database Design", "Stored Procedures", "Query Tuning"],
      result: "Achieved zero data anomaly conflicts, minimized redundant transaction logs, and reduced analytic query execution latency by 35% through optimal table indexing keys."
    },
    atm: {
      title: "ATM Simulator",
      problem: "Basic console banking applications fail to structure concurrent transactional states safely, leading to validation bypasses and poor error boundary mapping.",
      solution: "Developed an object-oriented Python command-line banking emulator. Implemented finite state-machine transitions, exception frameworks, and mock database memory tables.",
      technologies: ["Python", "Object-Oriented Programming (OOP)", "Finite State Logic", "Exception Handling", "Data Structures"],
      result: "Engineered a robust terminal banking console with clean authentication flow, safe deposit/withdrawal processing, and automated account lock validation."
    },
    library: {
      title: "Library Management System",
      problem: "Users require a simple, responsive portal to search, bookmark, and catalog book collections without complex infrastructure requirements.",
      solution: "Built a React single-page application integrating Redux Toolkit for bookmarks state storage, Axios client modules, and React Router v7 routes. Created custom filtering algorithms sorting records dynamically.",
      technologies: ["React 19", "Redux Toolkit", "React Router v7", "Axios", "CSS Grid/Flexbox"],
      result: "Delivered a lightweight client-side digital catalog supporting responsive search queries, collection sorting filters, bookmarks caching, and route protection structures."
    },
    zapbite: {
      title: "ZapBite — AI Food Delivery Platform",
      problem: "Traditional delivery systems lack automated rider route telemetry, interactive multi-role portals, and intelligent dietary search concierges.",
      solution: "Engineered a full-stack real-time logistics dashboard using React 19, Tailwind CSS v4, and Google Maps API. Integrated an AI-powered conversational food concierge (BiteBot AI), live order tracking progress, and simulated telemetry speedometers.",
      technologies: ["React 19", "Tailwind CSS v4", "Google Maps API", "BiteBot AI", "Node.js", "Chart.js"],
      result: "Delivered a cyber-luxe dark glassmorphic web portal tracking order lifecycle states, auto-calculating speed/ETAs, and providing interactive geocoding pinned locations."
    }
  };

  // --- Typing Animation Hook ---
  useEffect(() => {
    const textArray = ["Full Stack Developer", "Python Developer", ".NET Core Developer", "MySQL Specialist"];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      const currentWord = textArray[textArrayIndex];
      
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentWord.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 2000); // Hold word
        } else {
          timeoutId = setTimeout(tick, 100); // Typing speed
        }
      } else {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          textArrayIndex = (textArrayIndex + 1) % textArray.length;
          timeoutId = setTimeout(tick, 500); // Pause before next word
        } else {
          timeoutId = setTimeout(tick, 60); // Erasing speed
        }
      }
    };

    timeoutId = setTimeout(tick, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // --- Scroll Listeners (Navbar Scrolled & Scroll Progress state) ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavbarScrolled(true);
      } else {
        setIsNavbarScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Hash Routing support & Navigation Click Handlers ---
  const handleNavClick = (e, section) => {
    if (e) e.preventDefault();
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    window.location.hash = section === 'hero' ? '' : `#${section}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validSections = ['hero', 'about', 'education', 'skills', 'experience', 'projects', 'certifications', 'resume', 'achievements', 'contact'];
      if (hash && validSections.includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('hero');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- ATM Simulator Text loop ---
  useEffect(() => {
    const messages = [
      "NEXUS BANK",
      "INSERT CARD...",
      "ENTER PIN: ****",
      "PROCESSING...",
      "ACCESS GRANTED",
      "CASH DISPENSED!",
      "THANK YOU!"
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setAtmText(messages[idx]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- Interactive 3D Particle Canvas Background Hook ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Fetch the live theme accent colors defined in CSS variables
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-cyan').trim() || '#6366f1';
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-purple').trim() || '#a855f7';

    // Helper to format any color value to an RGBA string with dynamic opacity
    const toRgba = (colorVal, opacity) => {
      let color = colorVal.trim();
      if (color.startsWith('rgb')) {
        const matches = color.match(/\d+/g);
        if (matches && matches.length >= 3) {
          return `rgba(${matches[0]}, ${matches[1]}, ${matches[2]}, ${opacity})`;
        }
      }
      color = color.replace('#', '');
      if (color.length === 3) {
        color = color.split('').map(char => char + char).join('');
      }
      const r = parseInt(color.substring(0, 2), 16) || 99;
      const g = parseInt(color.substring(2, 4), 16) || 102;
      const b = parseInt(color.substring(4, 6), 16) || 241;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: null, y: null, targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

    const handleWindowMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Calculate normalized tilt values between -1 and 1
      mouse.targetX = (e.clientX - width / 2) / (width / 2);
      mouse.targetY = (e.clientY - height / 2) / (height / 2);
    };

    const handleWindowMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseleave', handleWindowMouseLeave);
    window.addEventListener('resize', handleResize);

    const perspective = 500; // Focal length

    class Particle3D {
      constructor() {
        // Space boundaries: cube of size 1200x1200x1200 centered at origin
        this.x = (Math.random() - 0.5) * 1200;
        this.y = (Math.random() - 0.5) * 1200;
        this.z = (Math.random() - 0.5) * 1200;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.vz = (Math.random() - 0.5) * 0.6;
        this.baseSize = Math.random() * 2.5 + 1.5;
        
        // 2D screen coordinates
        this.screenX = 0;
        this.screenY = 0;
        this.size = 0;
        this.visible = false;
      }

      project(rotX, rotY) {
        // Rotate around Y axis (horizontal mouse movement)
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        let x1 = this.x * cosY - this.z * sinY;
        let z1 = this.x * sinY + this.z * cosY;

        // Rotate around X axis (vertical mouse movement)
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        let y2 = this.y * cosX - z1 * sinX;
        let z2 = this.y * sinX + z1 * cosX;

        // Push objects away from screen so they don't clip through camera (which is at z = -perspective)
        const zProj = z2 + 600;

        if (zProj > 10) {
          const scale = perspective / zProj;
          this.screenX = width / 2 + x1 * scale;
          this.screenY = height / 2 + y2 * scale;
          this.size = this.baseSize * scale;
          this.visible = this.screenX >= 0 && this.screenX <= width && this.screenY >= 0 && this.screenY <= height;
        } else {
          this.visible = false;
        }
      }

      draw() {
        if (!this.visible) return;
        ctx.beginPath();
        ctx.arc(this.screenX, this.screenY, this.size, 0, Math.PI * 2);
        // Fade particles based on depth Z
        const opacity = Math.max(0.05, Math.min(0.7, (1 - (this.z + 600) / 1200)));
        ctx.fillStyle = toRgba(primaryColor, opacity);
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Bounce inside the 3D cube boundaries
        if (Math.abs(this.x) > 600) this.vx *= -1;
        if (Math.abs(this.y) > 600) this.vy *= -1;
        if (Math.abs(this.z) > 600) this.vz *= -1;
      }
    }

    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: particleCount }, () => new Particle3D());

    const connect3D = () => {
      for (let i = 0; i < particles.length; i++) {
        if (!particles[i].visible) continue;
        
        // 1. Connect particles to each other
        for (let j = i + 1; j < particles.length; j++) {
          if (!particles[j].visible) continue;

          // Calculate 3D distance between particles
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect points that are close in 3D space
          if (dist3D < 180) {
            const alpha = ((180 - dist3D) / 180) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].screenX, particles[i].screenY);
            ctx.lineTo(particles[j].screenX, particles[j].screenY);
            ctx.strokeStyle = toRgba(secondaryColor, alpha);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // 2. Connect particles to mouse cursor (Spider Web effect)
        if (mouse.x !== null && mouse.y !== null) {
          const dx2D = particles[i].screenX - mouse.x;
          const dy2D = particles[i].screenY - mouse.y;
          const dist2D = Math.sqrt(dx2D * dx2D + dy2D * dy2D);

          if (dist2D < 180) {
            // Draw spider web silk connection
            const alpha = ((180 - dist2D) / 180) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].screenX, particles[i].screenY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = toRgba(primaryColor, alpha);
            ctx.lineWidth = 0.9;
            ctx.stroke();

            // Elastic tension pulling particle toward mouse in 3D coordinates
            const pullForce = ((180 - dist2D) / 180) * 0.4;
            const target3DX = mouse.targetX * 600;
            const target3DY = mouse.targetY * 600;
            
            particles[i].x += (target3DX - particles[i].x) * pullForce * 0.08;
            particles[i].y += (target3DY - particles[i].y) * pullForce * 0.08;
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate tilt angles smoothly (damping filter)
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

      // Map tilt angles to rotation limits (max 15 degrees)
      const rotY = mouse.currentX * 0.25;
      const rotX = -mouse.currentY * 0.25;

      particles.forEach(p => {
        p.update();
        p.project(rotX, rotY);
        p.draw();
      });

      connect3D();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseleave', handleWindowMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- Cursor Tracking & 3D Tilt Spotlights on Cards ---
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / (rect.height / 10); // max 10 degrees tilt
    const rotateY = (x - centerX) / (rect.width / 10);
    
    card.style.transition = 'none';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  // --- Contact Form Submission Handler ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (formName && formEmail && formMessage) {
      setFormState('sending');

      // EmailJS REST API - Dispatch Owner Notification
      const sendOwner = fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: formName,
            email: formEmail,
            message: formMessage
          }
        })
      });

      // EmailJS REST API - Dispatch Client Auto-reply
      const sendClient = fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_CLIENT_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: formName,
            email: formEmail,
            message: formMessage
          }
        })
      });

      // Submit both requests concurrently
      Promise.all([sendOwner, sendClient])
      .then(responses => {
        const networkError = responses.find(res => !res.ok);
        if (networkError) throw new Error("Email dispatch failed");
        return Promise.all(responses.map(res => res.text()));
      })
      .then(data => {
        if (data.includes("OK")) {
          setFormState('success');
          setFormName('');
          setFormEmail('');
          setFormMessage('');
          setTimeout(() => {
            setFormState('idle');
          }, 5000);
        } else {
          setFormState('error');
        }
      })
      .catch(error => {
        console.error("Form submit error:", error);
        setFormState('error');
      });
    }
  };

  // --- Backup Redirect Submission Trigger (Mailto Fallback) ---
  const handleBackupSubmit = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formName}`);
    const body = encodeURIComponent(`Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`);
    window.location.href = `mailto:nivedreddy6@gmail.com?subject=${subject}&body=${body}`;
    setFormState('idle');
  };

  // --- Developer Impact Console Terminal typewriter effect ---
  const consoleLines = [
    { text: "initializing developer profile...", type: "system" },
    { text: "loading education data...", type: "system" },
    { text: "✓ MCA - Vignan's University (CGPA: 7.33/10)", type: "success" },
    { text: "loading industry experience...", type: "system" },
    { text: "✓ Full Stack Intern @ Inspiredge IT Solutions (6 Months)", type: "success" },
    { text: "loading technical expertise...", type: "system" },
    { text: "✓ developed high-performance REST APIs in .NET Core & Python", type: "success" },
    { text: "✓ modeled database structures and CRUD processes in MySQL", type: "success" },
    { text: "✓ built modern, reactive frontends in React JS & Angular", type: "success" },
    { text: "loading professional certifications...", type: "system" },
    { text: "✓ Python Certification - Codegnan", type: "success" },
    { text: "✓ MySQL Certification - Codegnan", type: "success" },
    { text: "✓ Frontend Certification - Codegnan", type: "success" },
    { text: "loading project deployments...", type: "system" },
    { text: "✓ deployed ZapBite AI Food Delivery & Logistics Platform", type: "success" },
    { text: "✓ pushed 360+ active git contributions to Nivedreddy6/Portfolio", type: "success" },
    { text: "system ready. awaiting command...", type: "ready" }
  ];

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (activeSection !== 'achievements') {
      // Reset state if tab is inactive
      setVisibleLines([]);
      setCurrentLineIndex(0);
      setDisplayedText('');
      return;
    }

    if (currentLineIndex < consoleLines.length) {
      const line = consoleLines[currentLineIndex];
      let charIndex = 0;
      setDisplayedText('');

      const interval = setInterval(() => {
        if (charIndex < line.text.length) {
          setDisplayedText((prev) => prev + line.text.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(interval);
          setVisibleLines((prev) => [...prev, line]);
          setDisplayedText('');
          const timeout = setTimeout(() => {
            setCurrentLineIndex((prev) => prev + 1);
          }, 350);
          return () => clearTimeout(timeout);
        }
      }, 15); // Typing speed in ms

      return () => clearInterval(interval);
    }
  }, [currentLineIndex, activeSection]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Floating Glow Blobs */}
      <div className="background-glow">
        <div className="glow-blob blob-1"></div>
        <div className="glow-blob blob-2"></div>
        <div className="glow-blob blob-3"></div>
      </div>

      {/* Interactive Particle Network Canvas */}
      <canvas ref={canvasRef} className="particle-canvas" />

      {/* Navigation Header */}
      <header className={isNavbarScrolled ? 'scrolled' : ''}>
        <nav>
          <a href="#hero" className="logo flicker-slow" onClick={(e) => handleNavClick(e, 'hero')}>NIVED</a>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'about')}>About</a>
            <a href="#education" className={activeSection === 'education' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'education')}>Education</a>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'skills')}>Skills</a>
            <a href="#experience" className={activeSection === 'experience' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'experience')}>Experience</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'projects')}>Projects</a>
            <a href="#certifications" className={activeSection === 'certifications' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'certifications')}>Certifications</a>
            <a href="#resume" className={activeSection === 'resume' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'resume')}>Resume</a>
            <a href="#achievements" className={activeSection === 'achievements' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'achievements')}>Achievements</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </div>

          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <main className="container">
        
        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div className="tab-content">
            <section id="hero">
              <div className="hero-wrapper">
                <div className="hero-content scroll-reveal active">
                  <span className="hero-subtitle">Welcome to my space</span>
                  <h1 className="hero-title">
                    Hi, I'm <span className="flicker-fast">Tamma Nived Reddy</span>
                  </h1>
                  <div className="typing-container">
                    I am a <span className="typed-text">{typedText}</span><span className="cursor"></span>
                  </div>
                  <p className="hero-desc">
                    Motivated Full Stack Developer and MCA graduate. Experienced in building high-performance, secure web applications using Python, Angular, .NET Core, and MySQL. Passionate about clean code, database design, and user-centric software solutions.
                  </p>
                  <div className="hero-buttons">
                    <a href="#projects" className="btn-glow btn-primary" onClick={(e) => handleNavClick(e, 'projects')}>
                      View Work
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                    <a href="#contact" className="btn-glow btn-secondary" onClick={(e) => handleNavClick(e, 'contact')}>Get In Touch</a>
                  </div>
                </div>

                <div className="hero-graphic scroll-reveal active" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave}>
                  <div className="hero-svg-wrapper">
                    <svg className="hero-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Floating UI window */}
                      <g className="svg-float-element">
                        <rect x="50" y="80" width="220" height="150" rx="16" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                        <rect x="50" y="80" width="220" height="30" rx="16" fill="rgba(255, 255, 255, 0.05)" />
                        <circle cx="75" cy="95" r="5" fill="#ff5f56" />
                        <circle cx="90" cy="95" r="5" fill="#ffbd2e" />
                        <circle cx="105" cy="95" r="5" fill="#27c93f" />
                        
                        <rect x="70" y="130" width="120" height="8" rx="4" fill="url(#grad-cyan)" />
                        <rect x="70" y="150" width="160" height="8" rx="4" fill="rgba(255, 255, 255, 0.3)" />
                        <rect x="70" y="170" width="90" height="8" rx="4" fill="url(#grad-purple)" />
                        <rect x="70" y="190" width="140" height="8" rx="4" fill="rgba(255, 255, 255, 0.2)" />
                      </g>

                      {/* Floating Server Stack */}
                      <g className="svg-float-element-delayed">
                        <rect x="250" y="270" width="200" height="60" rx="10" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                        <circle cx="280" cy="300" r="6" fill="#6366f1" style={{ animation: 'pulse-glow-circle 2s infinite alternate' }} />
                        <line x1="310" y1="295" x2="410" y2="295" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="6" strokeLinecap="round" />
                        <line x1="310" y1="305" x2="370" y2="305" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="4" strokeLinecap="round" />
                        
                        <rect x="250" y="350" width="200" height="60" rx="10" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                        <circle cx="280" cy="380" r="6" fill="#a855f7" style={{ animation: 'pulse-glow-circle 2.5s infinite alternate' }} />
                        <line x1="310" y1="375" x2="390" y2="375" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="6" strokeLinecap="round" />
                        <line x1="310" y1="385" x2="420" y2="385" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="4" strokeLinecap="round" />
                      </g>

                      {/* Database Cylinder */}
                      <g className="svg-float-element">
                        <path d="M120 330 C120 310, 220 310, 220 330 L220 410 C220 430, 120 430, 120 410 Z" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                        <path d="M120 330 C120 345, 220 345, 220 330" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                        <path d="M120 360 C120 375, 220 375, 220 360" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                        <path d="M120 390 C120 405, 220 405, 220 390" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                        <ellipse cx="170" cy="330" rx="40" ry="10" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.6" />
                        <ellipse cx="170" cy="360" rx="40" ry="10" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />
                      </g>

                      {/* Connecting Network Wires */}
                      <path d="M 180 230 C 180 280, 290 230, 290 270" fill="none" stroke="url(#grad-cyan)" strokeWidth="2" strokeDasharray="10 5" className="svg-draw-path" />
                      <path d="M 290 350 C 290 310, 170 350, 170 310" fill="none" stroke="url(#grad-purple)" strokeWidth="2" strokeDasharray="8 4" className="svg-draw-path" />
                      
                      {/* Floating gears */}
                      <g className="svg-rotate-gear" transform="translate(390, 140)">
                        <path d="M0 -20 L4 -20 L6 -15 L11 -18 L14 -14 L9 -11 L12 -6 L18 -6 L18 0 L18 6 L12 6 L9 11 L14 14 L11 18 L6 15 L4 20 L-4 20 L-6 15 L-11 18 L-14 14 L-9 11 L-12 6 L-18 6 L-18 -6 L-12 -6 L-9 -11 L-14 -14 L-11 -18 L-6 -15 L-4 -20 Z" fill="none" stroke="#a855f7" strokeWidth="2" />
                        <circle cx="0" cy="0" r="7" fill="none" stroke="#a855f7" strokeWidth="2" />
                      </g>

                      <g className="svg-rotate-gear-reverse" transform="translate(430, 180)">
                        <path d="M0 -15 L3 -15 L5 -11 L9 -13 L11 -10 L7 -8 L9 -4 L14 -4 L14 0 L14 4 L9 4 L7 8 L11 10 L9 13 L5 11 L3 15 L-3 15 L-5 11 L-9 13 L-11 10 L-7 8 L-9 4 L-14 4 L-14 -4 L-9 -4 L-7 -8 L-11 -10 L-9 -13 L-5 -11 L-3 -15 Z" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="5" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                      </g>

                      <defs>
                        <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#4facfe" />
                        </linearGradient>
                        <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#e100ff" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact & Achievements Section */}
            <div className="achievements-section">
              <h2 className="achievements-title">Impact & Achievements</h2>
              <div className="achievements-grid">
                <div 
                  className="achievement-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <span className="achievement-num text-gradient-primary">6+ Mos</span>
                  <span className="achievement-label">Internship Experience</span>
                </div>
                <div 
                  className="achievement-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <span className="achievement-num text-gradient-primary">2</span>
                  <span className="achievement-label">Core Certifications</span>
                </div>
                <div 
                  className="achievement-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <span className="achievement-num text-gradient-primary">3+</span>
                  <span className="achievement-label">Completed Projects</span>
                </div>
                <div 
                  className="achievement-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <span className="achievement-num text-gradient-primary">7.33</span>
                  <span className="achievement-label">MCA Grade CGPA</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <div className="tab-content">
            <section id="about">
              <h2 className="section-title">About <span>Me</span></h2>
              
              <div className="about-header-text">
                <h3 className="about-subtitle-title">Bridging Academia & Industry</h3>
                <p className="about-subtitle-desc">
                  I am a <span className="highlight-text-primary">Full Stack Developer</span> and <span className="highlight-text-primary">MCA Graduate</span> combining theoretical computer science excellence with real-world software development internship experience.
                </p>
                <p className="about-subtitle-desc">
                  My work focuses on building robust backend services, relational databases, and modern frontends to deliver user-centric applications.
                </p>
              </div>

              {/* 3 Metrics Cards */}
              <div className="about-metrics-grid">
                <div 
                  className="about-metric-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <span className="about-metric-num">6+ Mos</span>
                  <span className="about-metric-label">Professional Internship</span>
                </div>
                <div 
                  className="about-metric-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <span className="about-metric-num">7.33</span>
                  <span className="about-metric-label">MCA Grade CGPA</span>
                </div>
                <div 
                  className="about-metric-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <span className="about-metric-num">2</span>
                  <span className="about-metric-label">Core Certifications</span>
                </div>
              </div>

              {/* Two-Column Detail Cards */}
              <div className="about-details-layout">
                {/* Left Card: Industry Experience */}
                <div 
                  className="detail-column-card glass-card border-blue"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <h3 className="detail-card-title text-gradient-cyan">Industry Experience</h3>
                  <ul className="detail-card-list">
                    <li>
                      <span className="icon">⚙️</span>
                      <span>Full Stack web development (Python, .NET, Angular)</span>
                    </li>
                    <li>
                      <span className="icon">🔌</span>
                      <span>REST API design & backend integrations</span>
                    </li>
                    <li>
                      <span className="icon">💾</span>
                      <span>Relational database modeling & CRUD in MySQL</span>
                    </li>
                    <li>
                      <span className="icon">👥</span>
                      <span>Agile sprint cycles & collaborative engineering</span>
                    </li>
                  </ul>
                </div>

                {/* Center text */}
                <div className="detail-center-connector">
                  <h4>Academia ⟷ Industry</h4>
                  <p>Applying advanced computer application principles to build high-performance, real-world software solutions.</p>
                </div>

                {/* Right Card: Academic Focus */}
                <div 
                  className="detail-column-card glass-card border-orange"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <h3 className="detail-card-title text-gradient-orange">Academic Focus</h3>
                  <ul className="detail-card-list">
                    <li>
                      <span className="icon">🎓</span>
                      <span>Master of Computer Applications (MCA) degree</span>
                    </li>
                    <li>
                      <span className="icon">💻</span>
                      <span>Strong OOP principles & data structures</span>
                    </li>
                    <li>
                      <span className="icon">📊</span>
                      <span>Relational database design & optimization</span>
                    </li>
                    <li>
                      <span className="icon">🛠️</span>
                      <span>Software development life cycle (SDLC)</span>
                    </li>
                  </ul>
                </div>
              </div>

            </section>
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="tab-content">
            <section id="education">
              <h2 className="section-title">Academic <span>Education</span></h2>
              <div className="about-education-wrapper" style={{ marginTop: '2rem' }}>
                <div 
                  className="timeline-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-degree">Master of Computer Applications (MCA)</h3>
                      <p className="timeline-inst">Vignan's Foundation for Science, Technology & Research</p>
                    </div>
                    <span className="timeline-year">2025</span>
                  </div>
                  <div className="timeline-gpa">
                    Academic Performance: <span>CGPA 7.33/10</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Certifications Section */}
        {activeSection === 'certifications' && (
          <div className="tab-content">
            <section id="certifications">
              <h2 className="section-title">Professional <span>Certifications</span></h2>
              <div className="certifications-wrapper">
                <div className="certs-grid">
                  
                  <div 
                    className="cert-card glass-card"
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={() => setSelectedCertificate('python')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="cert-badge-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="url(#badge-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="7" className="cert-medal" />
                        <circle cx="12" cy="8" r="3" className="cert-medal-inner" />
                        <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" className="cert-ribbon" />
                        <defs>
                          <linearGradient id="badge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="cert-info">
                      <h3>Python Certification</h3>
                      <p className="cert-issuer">Codegnan Training Institute</p>
                      <button className="cert-btn">
                        View Certificate
                      </button>
                    </div>
                  </div>

                  <div 
                    className="cert-card glass-card"
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={() => setSelectedCertificate('mysql')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="cert-badge-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="url(#badge-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="7" className="cert-medal" />
                        <circle cx="12" cy="8" r="3" className="cert-medal-inner" />
                        <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" className="cert-ribbon" />
                      </svg>
                    </div>
                    <div className="cert-info">
                      <h3>MySQL Certification</h3>
                      <p className="cert-issuer">Codegnan Training Institute</p>
                      <button className="cert-btn">
                        View Certificate
                      </button>
                    </div>
                  </div>

                  <div 
                    className="cert-card glass-card"
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    onClick={() => setSelectedCertificate('frontend')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="cert-badge-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="url(#badge-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="7" className="cert-medal" />
                        <circle cx="12" cy="8" r="3" className="cert-medal-inner" />
                        <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" className="cert-ribbon" />
                      </svg>
                    </div>
                    <div className="cert-info">
                      <h3>Frontend Certification</h3>
                      <p className="cert-issuer">Codegnan Training Institute</p>
                      <button className="cert-btn">
                        View Certificate
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div className="tab-content">
            <section id="skills">
              <h2 className="section-title">Technical <span>Skills</span></h2>
              
              <div className="skills-layout-wrapper">
                <div className="skills-categories">
                  
                  {/* Development Stack */}
                  <div className="skills-category glass-card">
                    <h3>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                      Development Stack
                    </h3>
                    <div className="skills-detailed-grid">
                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'Python' ? 'active' : ''}`}
                        data-skill="python" 
                        style={{ animationDelay: '100ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Python", score: "90%", level: "EXPERT", desc: "Data Systems & Automation" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.66 0 3 1.34 3 3v1.78c.89.4 1.5 1.3 1.5 2.33 0 .73-.31 1.38-.8 1.83z"/></svg>
                            </span>
                            <span className="skill-card-name">Python</span>
                          </div>
                          <span className="skill-card-percentage">90%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '90%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === '.NET Core' ? 'active' : ''}`}
                        data-skill="dotnet" 
                        style={{ animationDelay: '200ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: ".NET Core", score: "80%", level: "STRONG", desc: "Backend Enterprise Logic" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 5l6.5 11.5h-13L12 7z"/></svg>
                            </span>
                            <span className="skill-card-name">.NET Core</span>
                          </div>
                          <span className="skill-card-percentage">80%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '80%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'Frontend' ? 'active' : ''}`}
                        data-skill="react" 
                        style={{ animationDelay: '300ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Frontend", score: "85%", level: "ADVANCED", desc: "React & Angular Interfaces" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            </span>
                            <span className="skill-card-name">React JS</span>
                          </div>
                          <span className="skill-card-percentage">85%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '85%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'Frontend' ? 'active' : ''}`}
                        data-skill="angular" 
                        style={{ animationDelay: '400ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Frontend", score: "85%", level: "ADVANCED", desc: "React & Angular Interfaces" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M12 2L2 6l2 12 8 4 8-4 2-12-10-4z"/></svg>
                            </span>
                            <span className="skill-card-name">Angular</span>
                          </div>
                          <span className="skill-card-percentage">85%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '85%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'RESTful APIs' ? 'active' : ''}`}
                        data-skill="rest" 
                        style={{ animationDelay: '500ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "RESTful APIs", score: "90%", level: "EXPERT", desc: "API Design & Integration" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M17 17h2v2h-2zm-8 0h2v2H9zm-4 0h2v2H5zm14-4h-2v-2h2zm-6 0h-2v-2h2zm-6 0H5v-2h2zm12-4h-2V7h2zm-8 0h2V7H9zm-4 0h2V7H5z"/></svg>
                            </span>
                            <span className="skill-card-name">RESTful APIs</span>
                          </div>
                          <span className="skill-card-percentage">90%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '90%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'OOP Principles' ? 'active' : ''}`}
                        data-skill="oop" 
                        style={{ animationDelay: '600ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "OOP Principles", score: "80%", level: "STRONG", desc: "Modular OOP Architecture" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                            </span>
                            <span className="skill-card-name">OOP Principles</span>
                          </div>
                          <span className="skill-card-percentage">80%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Databases & Tools */}
                  <div className="skills-category glass-card">
                    <h3>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>
                      Databases & Utilities
                    </h3>
                    <div className="skills-detailed-grid">
                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'Databases' ? 'active' : ''}`}
                        data-skill="mysql" 
                        style={{ animationDelay: '100ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Databases", score: "85%", level: "ADVANCED", desc: "MySQL Architecture & CRUD" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            </span>
                            <span className="skill-card-name">MySQL</span>
                          </div>
                          <span className="skill-card-percentage">85%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '85%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'Git & GitHub' ? 'active' : ''}`}
                        data-skill="git" 
                        style={{ animationDelay: '200ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Git & GitHub", score: "80%", level: "STRONG", desc: "Version Control & Workflows" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M2.6 10.5l8.5-8.5c.9-.9 2.4-.9 3.3 0l2 2-2.3 2.3c-.6-.4-1.4-.3-2 .3-.6.6-.7 1.5-.3 2.1l-2.4 2.4c-.6-.4-1.5-.3-2.1.3-.8.8-.8 2.1 0 2.9.8.8 2.1.8 2.9 0 .6-.6.7-1.5.3-2.1l2.4-2.4c.6.4 1.5.3 2.1-.3.6-.6.7-1.5.3-2.1l2.3-2.3 4.3 4.3c.9.9.9 2.4 0 3.3l-8.5 8.5c-.9.9-2.4.9-3.3 0L2.6 13.8c-.9-.9-.9-2.4 0-3.3z"/></svg>
                            </span>
                            <span className="skill-card-name">Git & GitHub</span>
                          </div>
                          <span className="skill-card-percentage">80%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '80%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'VS Code' ? 'active' : ''}`}
                        data-skill="vscode" 
                        style={{ animationDelay: '300ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "VS Code", score: "85%", level: "ADVANCED", desc: "IDE Optimization & Extensions" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                            </span>
                            <span className="skill-card-name">VS Code</span>
                          </div>
                          <span className="skill-card-percentage">85%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '85%' }}></div>
                        </div>
                      </div>

                      <div 
                        className={`skill-progress-card ${hoveredSkill && hoveredSkill.name === 'Visual Studio' ? 'active' : ''}`}
                        data-skill="visualstudio" 
                        style={{ animationDelay: '400ms' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Visual Studio", score: "80%", level: "STRONG", desc: "C# & .NET Environment Tools" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="skill-card-top">
                          <div className="skill-name-group">
                            <span className="skill-card-icon">
                              <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                            </span>
                            <span className="skill-card-name">Visual Studio</span>
                          </div>
                          <span className="skill-card-percentage">80%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-fill" style={{ '--progress-width': '80%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Radar Chart Panel */}
                <div 
                  className="skills-radar-panel glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <h3 className="radar-title">Skill Overview</h3>
                  <div className="radar-chart-container">
                    <svg className="radar-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="radar-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(99, 102, 241, 0.25)" />
                          <stop offset="100%" stopColor="rgba(168, 85, 247, 0.25)" />
                        </linearGradient>
                        <linearGradient id="radar-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>

                      {/* Concentric Hexagons */}
                      <path d="M200,170 L226,185 L226,215 L200,230 L174,215 L174,185 Z" className="radar-grid-line" />
                      <path d="M200,140 L252,170 L252,230 L200,260 L148,230 L148,170 Z" className="radar-grid-line" />
                      <path d="M200,110 L278,155 L278,245 L200,290 L122,245 L122,155 Z" className="radar-grid-line" />
                      <path d="M200,80 L304,140 L304,260 L200,320 L96,260 L96,140 Z" className="radar-grid-line" />

                      {/* Tactical HUD Sweeper & Target Ring */}
                      <circle cx="200" cy="200" r="140" className="hud-target-ring-outer" />
                      <line x1="200" y1="200" x2="200" y2="60" className="radar-sweep-line" />

                      {/* Spokes */}
                      <line x1="200" y1="200" x2="200" y2="80" className="radar-grid-line" />
                      <line x1="200" y1="200" x2="304" y2="140" className="radar-grid-line" />
                      <line x1="200" y1="200" x2="304" y2="260" className="radar-grid-line" />
                      <line x1="200" y1="200" x2="200" y2="320" className="radar-grid-line" />
                      <line x1="200" y1="200" x2="96" y2="260" className="radar-grid-line" />
                      <line x1="200" y1="200" x2="96" y2="140" className="radar-grid-line" />

                      {/* Central HUD Target/Crosshair */}
                      {!hoveredSkill ? (
                        <g className="radar-hud-group">
                          <circle cx="200" cy="200" r="16" className="radar-hud-circle" />
                          <line x1="178" y1="200" x2="222" y2="200" className="radar-hud-line" />
                          <line x1="200" y1="178" x2="200" y2="222" className="radar-hud-line" />
                          <text x="200" y="235" className="radar-hud-status" textAnchor="middle">SYS: ACTIVE</text>
                        </g>
                      ) : (
                        <g className="radar-hud-group active">
                          <circle cx="200" cy="200" r="22" className="radar-hud-circle active" />
                          <text x="200" y="195" className="radar-hud-val" textAnchor="middle">{hoveredSkill.score}</text>
                          <text x="200" y="210" className="radar-hud-lbl" textAnchor="middle">{hoveredSkill.level}</text>
                          <text x="200" y="238" className="radar-hud-desc" textAnchor="middle">{hoveredSkill.desc}</text>
                        </g>
                      )}

                      {/* Filled Data Area */}
                      <polygon points="200,92 293.5,146 288.3,251 200,296 111.7,251 116.9,152" className="radar-data-area" />
                      
                      {/* Vertex Markers */}
                      <circle cx="200" cy="92" r="4" className={`radar-dot ${hoveredSkill && hoveredSkill.name === 'RESTful APIs' ? 'active' : ''}`} />
                      <circle cx="293.5" cy="146" r="4" className={`radar-dot ${hoveredSkill && hoveredSkill.name === 'Python' ? 'active' : ''}`} />
                      <circle cx="288.3" cy="251" r="4" className={`radar-dot ${hoveredSkill && hoveredSkill.name === 'Frontend' ? 'active' : ''}`} />
                      <circle cx="200" cy="296" r="4" className={`radar-dot ${hoveredSkill && hoveredSkill.name === '.NET Core' ? 'active' : ''}`} />
                      <circle cx="111.7" cy="251" r="4" className={`radar-dot ${hoveredSkill && hoveredSkill.name === 'Databases' ? 'active' : ''}`} />
                      <circle cx="116.9" cy="152" r="4" className={`radar-dot ${hoveredSkill && hoveredSkill.name === 'OOP Principles' ? 'active' : ''}`} />

                      {/* Labels */}
                      <text x="200" y="62" className={`radar-label notranslate ${hoveredSkill && hoveredSkill.name === 'RESTful APIs' ? 'active' : ''}`} translate="no" textAnchor="middle">RESTful APIs</text>
                      <text x="315" y="140" className={`radar-label notranslate ${hoveredSkill && hoveredSkill.name === 'Python' ? 'active' : ''}`} translate="no" textAnchor="start">Python</text>
                      <text x="315" y="265" className={`radar-label notranslate ${hoveredSkill && hoveredSkill.name === 'Frontend' ? 'active' : ''}`} translate="no" textAnchor="start">Frontend</text>
                      <text x="200" y="342" className={`radar-label notranslate ${hoveredSkill && hoveredSkill.name === '.NET Core' ? 'active' : ''}`} translate="no" textAnchor="middle">.NET Core</text>
                      <text x="85" y="265" className={`radar-label notranslate ${hoveredSkill && hoveredSkill.name === 'Databases' ? 'active' : ''}`} translate="no" textAnchor="end">Databases</text>
                      <text x="85" y="140" className={`radar-label notranslate ${hoveredSkill && hoveredSkill.name === 'OOP Principles' ? 'active' : ''}`} translate="no" textAnchor="end">OOP Principles</text>

                      {/* Invisible Hover Zones */}
                      <circle cx="200" cy="92" r="28" fill="transparent" style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredSkill({ name: "RESTful APIs", score: "90%", level: "EXPERT", desc: "API Design & Integration" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      />
                      <circle cx="293.5" cy="146" r="28" fill="transparent" style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Python", score: "90%", level: "EXPERT", desc: "Data Systems & Automation" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      />
                      <circle cx="288.3" cy="251" r="28" fill="transparent" style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Frontend", score: "85%", level: "ADVANCED", desc: "React & Angular Interfaces" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      />
                      <circle cx="200" cy="296" r="28" fill="transparent" style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredSkill({ name: ".NET Core", score: "80%", level: "STRONG", desc: "Backend Enterprise Logic" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      />
                      <circle cx="111.7" cy="251" r="28" fill="transparent" style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredSkill({ name: "Databases", score: "85%", level: "ADVANCED", desc: "MySQL Architecture & CRUD" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      />
                      <circle cx="116.9" cy="152" r="28" fill="transparent" style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredSkill({ name: "OOP Principles", score: "80%", level: "STRONG", desc: "Modular OOP Architecture" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      />
                    </svg>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="tab-content">
            <section id="experience">
              <h2 className="section-title">Work <span>Experience</span></h2>
              <div className="experience-wrapper">
                <div 
                  className="exp-card glass-card"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="exp-header">
                    <div className="exp-title-group">
                      <h3>Full Stack Development Intern</h3>
                      <div className="exp-company">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        Inspiredge IT Solutions
                      </div>
                    </div>
                    <span className="exp-date">Nov 2025 – May 2026</span>
                  </div>

                  <div className="exp-contributions-grid">
                    <div className="contribution-card border-blue-glow">
                      <div className="contribution-icon-wrapper cyan-glow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon-monitor">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                          <path className="monitor-code" d="M6 7l2 2-2 2" />
                          <line className="monitor-cursor" x1="10" y1="9" x2="13" y2="9" />
                        </svg>
                      </div>
                      <div className="contribution-content">
                        <h4>Full-Stack Development</h4>
                        <p>Developed and maintained interactive web application features. Engineered responsive user interfaces and implemented strict client-side validations to maximize security and UX.</p>
                        <div className="contribution-tags">
                          <span>Python</span>
                          <span>Angular</span>
                          <span>.NET Core</span>
                          <span>Validation</span>
                        </div>
                      </div>
                    </div>

                    <div className="contribution-card border-purple-glow">
                      <div className="contribution-icon-wrapper purple-glow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon-server">
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                          <circle className="server-led server-led-top" cx="6" cy="6" r="1.5" />
                          <circle className="server-led server-led-bottom" cx="6" cy="18" r="1.5" />
                          <line x1="10" y1="6" x2="18" y2="6" className="server-bus" />
                          <line x1="10" y1="18" x2="16" y2="18" className="server-bus" />
                        </svg>
                      </div>
                      <div className="contribution-content">
                        <h4>RESTful API Engineering</h4>
                        <p>Designed, tested, and optimized backend modules and REST APIs to support scalable client-side features, improving payload routing latency and system efficiency.</p>
                        <div className="contribution-tags">
                          <span>REST APIs</span>
                          <span>Backend Logic</span>
                          <span>Optimization</span>
                          <span>C#</span>
                        </div>
                      </div>
                    </div>

                    <div className="contribution-card border-blue-glow">
                      <div className="contribution-icon-wrapper cyan-glow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon-database">
                          <ellipse cx="12" cy="5" rx="9" ry="3" className="db-top" />
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" className="db-cylinder-body" />
                          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" className="db-cylinder-mid" />
                        </svg>
                      </div>
                      <div className="contribution-content">
                        <h4>Database Operations</h4>
                        <p>Developed, queried, and maintained database tables, execution scripts, and CRUD processes within MySQL databases to guarantee robust data storage and retrieval speed.</p>
                        <div className="contribution-tags">
                          <span>MySQL</span>
                          <span>CRUD Scripts</span>
                          <span>Schema Design</span>
                        </div>
                      </div>
                    </div>

                    <div className="contribution-card border-purple-glow">
                      <div className="contribution-icon-wrapper purple-glow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-icon-agile">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" className="agile-loop" />
                          <path d="M22 6.5l1.5-2.5-2.5 0.5" className="agile-arrow" />
                        </svg>
                      </div>
                      <div className="contribution-content">
                        <h4>Agile & Collaboration</h4>
                        <p>Participated in Agile sprint structures, daily planning, code reviews, unit testing, and issue resolving. Collaborated with senior engineers to deliver targets within milestone windows.</p>
                        <div className="contribution-tags">
                          <span>Agile Sprints</span>
                          <span>Code Reviews</span>
                          <span>Unit Testing</span>
                          <span>Git</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div className="tab-content">
            <section id="projects">
              <h2 className="section-title">Key <span>Projects</span></h2>
              <div className="projects-grid">
            
            {/* Project 1: CRM Database System */}
            <div 
              className="project-card glass-card clickable-project-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => setSelectedProject('crm')}
            >
              <div className="project-visual">
                <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className="svg-float-element">
                    <rect x="20" y="30" width="100" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="#6366f1" stroke-width="1.5" />
                    <rect x="20" y="30" width="100" height="22" rx="8" fill="rgba(99, 102, 241,0.15)" />
                    <text x="30" y="45" fill="#f5f6f8" font-size="10" font-family="Outfit" font-weight="600">CUSTOMERS</text>
                    <line x1="30" y1="65" x2="110" y2="65" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round" />
                    <line x1="30" y1="80" x2="90" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round" />
                    <line x1="30" y1="95" x2="100" y2="95" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round" />
                  </g>

                  <g className="svg-float-element-delayed">
                    <rect x="280" y="30" width="100" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="#a855f7" stroke-width="1.5" />
                    <rect x="280" y="30" width="100" height="22" rx="8" fill="rgba(168, 85, 247,0.15)" />
                    <text x="295" y="45" fill="#f5f6f8" font-size="10" font-family="Outfit" font-weight="600">SALES</text>
                    <line x1="290" y1="65" x2="370" y2="65" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round" />
                    <line x1="290" y1="80" x2="350" y2="80" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round" />
                    <line x1="290" y1="95" x2="360" y2="95" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round" />
                  </g>

                  <g className="svg-float-element">
                    <rect x="150" y="110" width="100" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="#ff007f" stroke-width="1.5" />
                    <rect x="150" y="110" width="100" height="22" rx="8" fill="rgba(255,0,127,0.15)" />
                    <text x="165" y="125" fill="#f5f6f8" font-size="10" font-family="Outfit" font-weight="600">TRANSACTS</text>
                    <line x1="160" y1="145" x2="240" y2="145" stroke="rgba(255,255,255,0.2)" stroke-width="4" stroke-linecap="round" />
                    <line x1="160" y1="160" x2="220" y2="160" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round" />
                    <line x1="160" y1="175" x2="230" y2="175" stroke="rgba(255,255,255,0.1)" stroke-width="4" stroke-linecap="round" />
                  </g>

                  <path d="M120 75 L150 140" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4 2" />
                  <path d="M120 75 L150 140" className="query-flow-dot" fill="none" />
                  
                  <path d="M280 75 L250 140" stroke="#a855f7" stroke-width="1.5" stroke-dasharray="4 2" />
                  <path d="M280 75 L250 140" className="query-flow-dot-purple" fill="none" />
                  
                  <circle cx="120" cy="75" r="3" fill="#6366f1" />
                  <circle cx="150" cy="140" r="3" fill="#6366f1" />
                  <circle cx="280" cy="75" r="3" fill="#a855f7" />
                  <circle cx="250" cy="140" r="3" fill="#a855f7" />
                </svg>
              </div>
              <div className="project-content">
                <div className="project-tech">
                  <span className="tech-pill">MySQL</span>
                  <span className="tech-pill">SQL</span>
                  <span className="tech-pill">Database Design</span>
                </div>
                <h3 className="project-title">
                  CRM Database System
                </h3>
                <p className="project-desc">
                  Designed and optimized a normalized database structure to manage customer relations, transactions, and sales insights efficiently.
                </p>
                <ul className="project-bullets">
                  <li>Designed third normal form (3NF) relational tables maintaining high data integrity.</li>
                  <li>Authored stored procedures and advanced SQL queries for automated metrics extraction.</li>
                  <li>Improved execution performance through strategic indexing and query structure testing.</li>
                </ul>
                <div className="project-links" style={{ marginTop: '1.5rem' }}>
                  <a 
                    href="https://github.com/Nivedreddy6/Mysql" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-glow btn-primary"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', display: 'inline-flex', alignItems: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub Code
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ marginLeft: '6px' }}>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: ATM Simulator */}
            <div 
              className="project-card glass-card clickable-project-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => setSelectedProject('atm')}
            >
              <div className="project-visual">
                <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className="svg-float-element">
                    <rect x="80" y="20" width="240" height="180" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" />
                    <rect x="95" y="35" width="210" height="110" rx="8" fill="#03020a" stroke="#a855f7" stroke-width="1.5" />
                    
                    <text x="200" y="65" textAnchor="middle" fill="#6366f1" font-size="12" font-family="Outfit" font-weight="600" letter-spacing="1">NEXUS BANK</text>
                    <text x="200" y="95" textAnchor="middle" fill="#f5f6f8" font-size="9" font-family="Inter">{atmText}</text>
                    
                    <rect x="110" y="105" width="180" height="25" rx="6" fill="rgba(99, 102, 241, 0.08)" stroke="rgba(99, 102, 241, 0.3)" stroke-width="1" />
                    <text x="135" y="121" fill="#6366f1" font-size="8" font-family="Inter" font-weight="600">SECURE PIN VERIFICATION</text>
                    
                    <rect className="atm-key atm-key-1" x="130" y="155" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                    <rect className="atm-key atm-key-2" x="160" y="155" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                    <rect className="atm-key atm-key-3" x="190" y="155" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                    <rect className="atm-key atm-key-4" x="220" y="155" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                    
                    <rect className="atm-key atm-key-5" x="130" y="175" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                    <rect className="atm-key atm-key-6" x="160" y="175" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                    <rect className="atm-key atm-key-7" x="190" y="175" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                    <rect className="atm-key atm-key-8" x="220" y="175" width="25" height="15" rx="3" fill="rgba(255,255,255,0.05)" />
                  </g>
                </svg>
              </div>
              <div className="project-content">
                <div className="project-tech">
                  <span className="tech-pill">Python</span>
                  <span className="tech-pill">OOP</span>
                  <span className="tech-pill">Data Structures</span>
                </div>
                <h3 className="project-title">
                  ATM Simulator
                </h3>
                <p className="project-desc">
                  Developed a console-based banking emulator implementing OOP structures, secure verification, and mock transaction logic.
                </p>
                <ul className="project-bullets">
                  <li>Created clean state logic for PIN authentication and account locking functions.</li>
                  <li>Used dictionary structures to cache transaction statements and details securely.</li>
                  <li>Structured code modularity using custom validation logic and exception handles.</li>
                </ul>
                <div className="project-links" style={{ marginTop: '1.5rem' }}>
                  <a 
                    href="https://atm-pi-ecru.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-glow btn-primary"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', display: 'inline-flex', alignItems: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3: Library Management System */}
            <div 
              className="project-card glass-card clickable-project-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => setSelectedProject('library')}
            >
              <div className="project-visual">
                <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Shelves background */}
                  <line x1="40" y1="160" x2="360" y2="160" stroke="rgba(255,255,255,0.08)" stroke-width="6" stroke-linecap="round" />
                  <line x1="40" y1="90" x2="360" y2="90" stroke="rgba(255,255,255,0.05)" stroke-width="4" stroke-linecap="round" />

                  {/* Books on the lower shelf */}
                  <g>
                    {/* Book 1 */}
                    <path d="M60 157 L60 95 A 3 3 0 0 1 63 92 L80 92 A 3 3 0 0 1 83 95 L83 157 Z" className="lib-book lib-book-1" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" stroke-width="1.5" />
                    <rect x="67" y="102" width="6" height="45" rx="1" fill="rgba(255,255,255,0.15)" className="lib-book-spine lib-book-1" />
                    
                    {/* Book 2 */}
                    <path d="M86 157 L86 105 A 3 3 0 0 1 89 102 L106 102 A 3 3 0 0 1 109 105 L109 157 Z" className="lib-book lib-book-2" fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" stroke-width="1.5" />
                    <rect x="93" y="112" width="6" height="35" rx="1" fill="rgba(255,255,255,0.15)" className="lib-book-spine lib-book-2" />

                    {/* Book 3 (Leaning) */}
                    <g className="lib-book-leaning-group">
                      <path d="M112 157 L112 95 A 3 3 0 0 1 115 92 L132 92 A 3 3 0 0 1 135 95 L135 157 Z" className="lib-book lib-book-leaning" fill="rgba(255, 0, 127, 0.2)" stroke="#ff007f" stroke-width="1.5" />
                      <rect x="119" y="102" width="6" height="45" rx="1" fill="rgba(255,255,255,0.15)" className="lib-book-spine-leaning" />
                    </g>
                  </g>

                  {/* Top Floating Dashboard Window (representing Management system UI) */}
                  <g className="svg-float-element-delayed" transform="translate(180, 25)">
                    <rect x="0" y="0" width="180" height="110" rx="12" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5" />
                    <rect x="0" y="0" width="180" height="20" rx="12" fill="rgba(99, 102, 241, 0.12)" />
                    
                    {/* Window Controls */}
                    <circle cx="12" cy="10" r="3" fill="#ff5f56" />
                    <circle cx="22" cy="10" r="3" fill="#ffbd2e" />
                    <circle cx="32" cy="10" r="3" fill="#27c93f" />

                    {/* Dashboard charts simulation */}
                    <rect x="12" y="32" width="156" height="16" rx="4" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
                    <text x="20" y="43" fill="#6366f1" font-size="8" font-family="Outfit" font-weight="600">BOOKS</text>
                    <text x="156" y="43" textAnchor="end" fill="#c9ccd4" font-size="8" font-family="Inter">Search...</text>

                    {/* Search Results list */}
                    <g className="search-row-group search-row-group-1">
                      <rect x="12" y="56" width="156" height="12" rx="3" fill="rgba(168, 85, 247, 0.08)" className="search-row search-row-1" />
                      <rect x="18" y="60" width="80" height="4" rx="2" fill="#c9ccd4" className="search-row-bar search-row-1" />
                      <circle cx="158" cy="62" r="3" fill="#ff007f" className="search-row-dot" />
                    </g>

                    <g className="search-row-group search-row-group-2">
                      <rect x="12" y="74" width="156" height="12" rx="3" fill="rgba(255, 255, 255, 0.02)" className="search-row search-row-2" />
                      <rect x="18" y="78" width="60" height="4" rx="2" fill="rgba(255,255,255,0.3)" className="search-row-bar search-row-2" />
                    </g>

                    <g className="search-row-group search-row-group-3">
                      <rect x="12" y="92" width="156" height="12" rx="3" fill="rgba(255, 255, 255, 0.02)" className="search-row search-row-3" />
                      <rect x="18" y="96" width="70" height="4" rx="2" fill="rgba(255,255,255,0.3)" className="search-row-bar search-row-3" />
                    </g>
                  </g>

                  {/* Pulsing/glow effects around the search match */}
                  <circle cx="338" cy="87" r="10" fill="none" stroke="#ff007f" stroke-width="1" stroke-dasharray="3 1" style={{ animation: 'pulse-glow-circle 2s infinite' }} />
                  <path d="M260 87 A 35 35 0 0 0 338 87" stroke="#ff007f" stroke-width="1.5" stroke-dasharray="3 3" />
                </svg>
              </div>
              <div className="project-content">
                <div className="project-tech">
                  <span className="tech-pill">React 19</span>
                  <span className="tech-pill">Redux Toolkit</span>
                  <span className="tech-pill">React Router v7</span>
                  <span className="tech-pill">Axios</span>
                </div>
                <h3 className="project-title">
                  Library Management System
                </h3>
                <p className="project-desc">
                  Designed and built a responsive web application to catalog, filter, search, and manage a digital collection of books.
                </p>
                <ul className="project-bullets">
                  <li>Integrated Redux Toolkit for clean client-side state management of user favorites and bookmarks.</li>
                  <li>Created dynamic filtering algorithms sorting records by genre, rating, and shelflist location.</li>
                  <li>Built protected authentication routes for adding, editing, and deleting records using simulated REST endpoints.</li>
                </ul>
                <div className="project-links" style={{ marginTop: '1.5rem' }}>
                  <a 
                    href="https://library-management-six-silk.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-glow btn-primary"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', display: 'inline-flex', alignItems: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" style={{ marginLeft: '6px' }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 4: ZapBite */}
            <div 
              className="project-card glass-card clickable-project-card"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => setSelectedProject('zapbite')}
            >
              <div className="project-visual">
                <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 50 0 L 50 220 M 100 0 L 100 220 M 150 0 L 150 220 M 200 0 L 200 220 M 250 0 L 250 220 M 300 0 L 300 220 M 350 0 L 350 220" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  
                  <path d="M 50 160 L 180 160 L 230 80 L 350 80" stroke="rgba(99, 102, 241, 0.2)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 50 160 L 180 160 L 230 80 L 350 80" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4" className="modal-wave-line-1" />
                  
                  <circle cx="50" cy="160" r="6" fill="#a855f7" />
                  <circle cx="50" cy="160" r="12" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5" style={{ animation: 'pulse-glow-circle 2s infinite' }} />
                  
                  <circle cx="350" cy="80" r="6" fill="var(--accent-cyan)" />
                  <circle cx="350" cy="80" r="12" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.5" style={{ animation: 'pulse-glow-circle 2s infinite' }} />

                  <g transform="translate(195, 136)" className="svg-float-element">
                    <circle cx="12" cy="12" r="16" fill="rgba(7, 11, 20, 0.9)" stroke="var(--accent-purple)" strokeWidth="1.5" />
                    <path d="M4 14 L8 14 M16 14 L20 14 M8 14 C8 10 16 10 16 14" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="14" r="2.5" fill="#a855f7" />
                    <circle cx="16" cy="14" r="2.5" fill="#a855f7" />
                  </g>
                </svg>
              </div>
              <div className="project-content">
                <div className="project-tech">
                  <span className="tech-pill">React 19</span>
                  <span className="tech-pill">Tailwind CSS v4</span>
                  <span className="tech-pill">Google Maps API</span>
                  <span className="tech-pill">BiteBot AI</span>
                </div>
                <h3 className="project-title">
                  ZapBite AI Food Delivery
                </h3>
                <p className="project-desc">
                  Engineered a full-stack, AI-powered food delivery and restaurant logistics ecosystem featuring dynamic Google Maps telemetry.
                </p>
                <ul className="project-bullets">
                  <li>Integrated a real-time Google Maps interface overlay tracking dynamic rider coordinate paths.</li>
                  <li>Created BiteBot AI, a responsive conversational dietary concierge recommending local dishes.</li>
                  <li>Authored automated order lifecycles and realistic delivery SPEED/ETA speedometers.</li>
                </ul>
                <div className="project-links" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <a 
                    href="https://github.com/Nivedreddy6/ZapBite" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-glow btn-primary"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', display: 'inline-flex', alignItems: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub Code
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ marginLeft: '6px' }}>
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://zap-bite.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-glow btn-secondary"
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem', display: 'inline-flex', alignItems: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live Demo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" style={{ marginLeft: '6px' }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    )}

        {/* Resume Section */}
        {activeSection === 'resume' && (
          <div className="tab-content animate-fade-in">
            <section id="resume" className="resume-tab-section">
              <h2 className="section-title">Professional <span>Resume</span></h2>
              
              <div className="resume-viewer-container glass-card">
                {/* PDF Viewer Header Bar */}
                <div className="viewer-header-bar">
                  <div className="viewer-tab">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pdf-tab-icon">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Tamma_Nived_Reddy_Resume.pdf</span>
                  </div>
                  
                  <div className="viewer-actions">
                    <button onClick={handleCopyLink} className="viewer-action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      {copySuccess ? 'Link Copied!' : 'Copy Link'}
                    </button>
                    <button onClick={() => window.print()} className="viewer-action-btn secondary print-btn-control">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                      </svg>
                      Print
                    </button>
                    <a href="/Tamma_Nived_Reddy_Resume.pdf" download="Tamma_Nived_Reddy_Resume.pdf" className="viewer-action-btn primary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                </div>

                {/* Simulated Resume Paper Sheet */}
                <div className="simulated-resume-viewport">
                  <div className="simulated-resume-paper">
                    {/* Header */}
                    <div className="paper-header">
                      <h1>TAMMA NIVED REDDY</h1>
                      <div className="contact-meta">
                        <span>nivedreddy6@gmail.com</span> | <span>+91 77026 18534</span> | <span>Tenali, Andhra Pradesh</span>
                      </div>
                      <div className="social-meta">
                        <a href="https://github.com/Nivedreddy6" target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="https://linkedin.com/in/nived-reddy-97a986257" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      </div>
                    </div>

                    {/* Section: Profile */}
                    <div className="paper-section">
                      <h2 className="section-heading">Professional Summary</h2>
                      <p className="summary-paragraph">
                        Motivated MCA graduate with hands-on full stack development experience across Python, Flask, React JS, Angular, .NET Core, and MySQL. Proven ability to build responsive web applications, robust REST APIs, and normalized database solutions with strong problem-solving skills.
                      </p>
                    </div>

                    {/* Section: Experience */}
                    <div className="paper-section">
                      <h2 className="section-heading">Work Experience</h2>
                      <div className="job-entry">
                        <div className="entry-header">
                          <span className="title">Full Stack Development Intern</span>
                          <span className="date">Nov 2025 – May 2026</span>
                        </div>
                        <div className="company">Inspiredge IT Solutions</div>
                        <ul className="bullets">
                          <li>Developed and maintained full-stack web application modules using Python, Angular, .NET Core, and MySQL.</li>
                          <li>Designed robust backend architecture and secure REST APIs to support scalable application functionality.</li>
                          <li>Engineered responsive user interfaces with comprehensive client-side data validation and error handling.</li>
                          <li>Managed normalized MySQL database schemas, authored optimized SQL queries, and implemented efficient CRUD operations.</li>
                          <li>Collaborated actively in Agile sprint ceremonies, technical code reviews, debugging, and quality assurance.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Section: Education */}
                    <div className="paper-section">
                      <h2 className="section-heading">Education</h2>
                      <div className="edu-entry">
                        <div className="entry-header">
                          <span className="title">Master of Computer Applications (MCA)</span>
                          <span className="institution">Vignan's Foundation for Science, Technology & Research</span>
                        </div>
                        <div className="meta-row">
                          <span>CGPA: 7.33 / 10.0</span> | <span>Graduated 2025</span>
                        </div>
                      </div>
                    </div>

                    {/* Section: Skills */}
                    <div className="paper-section">
                      <h2 className="section-heading">Skills & Frameworks</h2>
                      <div className="skills-row">
                        <strong>Programming Languages:</strong>
                        <div className="skills-pills-container">
                          <span className="skill-pill">Python</span>
                          <span className="skill-pill">Flask</span>
                          <span className="skill-pill">.NET Core</span>
                          <span className="skill-pill">SQL</span>
                          <span className="skill-pill">MySQL</span>
                        </div>
                      </div>
                      <div className="skills-row">
                        <strong>Frameworks & Libraries:</strong>
                        <div className="skills-pills-container">
                          <span className="skill-pill">React JS</span>
                          <span className="skill-pill">Angular</span>
                          <span className="skill-pill">Redux Toolkit</span>
                        </div>
                      </div>
                      <div className="skills-row">
                        <strong>Tools & Development:</strong>
                        <div className="skills-pills-container">
                          <span className="skill-pill">RESTful APIs</span>
                          <span className="skill-pill">OOP Principles</span>
                          <span className="skill-pill">Git & GitHub</span>
                          <span className="skill-pill">VS Code</span>
                          <span className="skill-pill">Visual Studio</span>
                          <span className="skill-pill">Vite</span>
                        </div>
                      </div>
                    </div>

                    {/* Section: Certifications */}
                    <div className="paper-section last">
                      <h2 className="section-heading">Certifications</h2>
                      <ul className="bullets">
                        <li><strong>Python Certification</strong> – Codegnan Training Institute</li>
                        <li><strong>MySQL Certification</strong> – Codegnan Training Institute</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === 'achievements' && (
          <div className="tab-content">
            <section id="achievements">
              <h2 className="section-title">Developer <span>Impact Console</span></h2>
              <div className="console-wrapper">
                <div className="console-terminal glass-card">
                  <div className="console-header-bar">
                    <div className="console-buttons">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <div className="console-title">nived@portfolio:~$</div>
                  </div>
                  <div className="console-body">
                    {visibleLines.map((line, index) => (
                      <div key={index} className={`console-line ${line.type}`}>
                        <span className="prompt-sym">$</span> {line.text}
                      </div>
                    ))}
                    {currentLineIndex < consoleLines.length && (
                      <div className={`console-line ${consoleLines[currentLineIndex].type}`}>
                        <span className="prompt-sym">$</span> {displayedText}
                        <span className="console-cursor">_</span>
                      </div>
                    )}
                    {currentLineIndex >= consoleLines.length && (
                      <div className="console-line prompt">
                        <span className="prompt-sym">$</span> <span className="console-cursor">_</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="tab-content">
            <section id="contact">
              <h2 className="section-title">Get In <span>Touch</span></h2>
          <div className="contact-grid">
            
            <div className="contact-info">
              <div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                  Have a project, job opening, or opportunity you'd like to discuss? Reach out through any of these platforms or use the messaging portal.
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse className="location-ping" cx="12" cy="19" rx="2" ry="1" stroke="#6366f1" strokeWidth="1.5" opacity="0" />
                        <path className="location-pin" d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="contact-text">
                      <h4>Location</h4>
                      <p>Tenali, Andhra Pradesh</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="phone-wave wave-1" d="M16 8a5 5 0 0 1 0 8" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0" />
                        <path className="phone-wave wave-2" d="M18 5a8 8 0 0 1 0 14" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0" />
                        <path className="phone-handset" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="contact-text">
                      <h4>Phone</h4>
                      <p><a href="tel:+917702618534">+91 77026 18534</a></p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className="email-letter" x="6" y="8" width="12" height="10" rx="1" fill="#6366f1" opacity="0" />
                        <path className="email-envelope-back" d="M4 8h16v10H4z" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path className="email-envelope-flap" d="M4 8l8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="contact-text">
                      <h4>Email</h4>
                      <p><a href="mailto:nivedreddy6@gmail.com">nivedreddy6@gmail.com</a></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <a href="https://github.com/Nivedreddy6" target="_blank" rel="noopener noreferrer" className="social-btn github" aria-label="GitHub">
                  <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com/in/nived-reddy-97a986257/" target="_blank" rel="noopener noreferrer" className="social-btn linkedin" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

            <div className="contact-form-panel glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
              
              {/* Submission Status Overlay */}
              {formState !== 'idle' && (
                <div className={`form-overlay ${formState}`}>
                  {formState === 'sending' && (
                    <div className="overlay-content">
                      <div className="plane-wrapper">
                        <svg className="flying-plane" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h3>Routing Message...</h3>
                      <p>Sending details securely to Nived's inbox</p>
                    </div>
                  )}
                  {formState === 'success' && (
                    <div className="overlay-content">
                      <div className="checkmark-wrapper">
                        <svg className="success-checkmark" viewBox="0 0 52 52">
                          <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                          <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                      </div>
                      <h3>Message Sent!</h3>
                      <p>Thank you! I will get back to you shortly.</p>
                      <button className="btn-glow btn-secondary" onClick={() => setFormState('idle')} style={{ marginTop: '1.5rem', padding: '0.6rem 1.5rem' }}>
                        Send Another
                      </button>
                    </div>
                  )}
                  {formState === 'error' && (
                    <div className="overlay-content">
                      <div className="error-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ff3366" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                      <h3>Connection Blocked</h3>
                      <p>Your browser or ad-blocker blocked the email route.</p>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button type="button" className="btn-glow btn-primary" onClick={handleBackupSubmit} style={{ padding: '0.6rem 1.2rem' }}>
                          Open Email Client
                        </button>
                        <button type="button" className="btn-glow btn-secondary" onClick={() => setFormState('idle')} style={{ padding: '0.6rem 1.2rem' }}>
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <form id="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    id="form-name" 
                    className="form-input" 
                    placeholder=" " 
                    required 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                  <label htmlFor="form-name" className="form-label">Full Name</label>
                  <div className="form-bar"></div>
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    id="form-email" 
                    className="form-input" 
                    placeholder=" " 
                    required 
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                  <label htmlFor="form-email" className="form-label">Email Address</label>
                  <div className="form-bar"></div>
                </div>
                
                <div className="form-group">
                  <textarea 
                    id="form-message" 
                    className="form-input" 
                    placeholder=" " 
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  ></textarea>
                  <label htmlFor="form-message" className="form-label">Your Message</label>
                  <div className="form-bar"></div>
                </div>

                <div className="submit-btn-wrapper">
                  <button type="submit" className="btn-glow btn-primary">
                    Send Message
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </section>
      </div>
    )}

  </main>

      <footer>
        <div className="footer-content container">
          <h2 className="footer-name flicker-slow">Tamma Nived Reddy</h2>
          <p className="footer-subtitle">Full Stack Developer | MCA Graduate</p>
          <div className="footer-socials">
            <a href="https://github.com/Nivedreddy6" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/t-nived-reddy-06834b281" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="mailto:nivedreddy800@gmail.com" className="footer-social-icon" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Tamma Nived Reddy. All rights reserved.</p>
        </div>
      </footer>

      {/* Project Detailed Modal Viewer */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-card glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="modal-banner">
              <div className="modal-banner-graphic">
                {selectedProject === 'crm' && (
                  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="rgba(99, 102, 241, 0.05)" />
                    <path d="M-50 150 C100 100, 200 250, 450 150" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.4" className="modal-flow-line-1" />
                    <path d="M-50 120 C120 180, 250 80, 450 130" stroke="var(--accent-purple)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" className="modal-flow-line-2" />
                    <circle cx="200" cy="100" r="40" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="6 2" className="modal-rotate-circle-inner" />
                    <circle cx="200" cy="100" r="60" fill="none" stroke="var(--accent-purple)" strokeWidth="1" strokeDasharray="10 4" className="modal-rotate-circle-outer" />
                  </svg>
                )}
                {selectedProject === 'atm' && (
                  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="rgba(168, 85, 247, 0.05)" />
                    <path d="M0 40 L180 40 L220 80 L400 80" stroke="var(--accent-purple)" strokeWidth="2" opacity="0.3" className="modal-circuit-line-1" />
                    <path d="M0 140 L150 140 L190 100 L400 100" stroke="var(--accent-cyan)" strokeWidth="2" opacity="0.2" className="modal-circuit-line-2" />
                    <rect x="160" y="70" width="80" height="40" rx="8" fill="rgba(255,255,255,0.02)" stroke="var(--accent-cyan)" strokeWidth="1.5" className="modal-pulse-box" />
                  </svg>
                )}
                {selectedProject === 'library' && (
                  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="rgba(236, 72, 153, 0.05)" />
                    <path d="M 50 0 L 50 200 M 100 0 L 100 200 M 150 0 L 150 200 M 200 0 L 200 200 M 250 0 L 250 200 M 300 0 L 300 200 M 350 0 L 350 200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <path d="M0 100 Q100 50, 200 100 T400 100" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" opacity="0.5" className="modal-wave-line-1" />
                    <path d="M0 120 Q120 180, 240 80 T400 120" stroke="var(--accent-purple)" strokeWidth="1.5" fill="none" opacity="0.4" className="modal-wave-line-2" />
                  </svg>
                )}
                {selectedProject === 'zapbite' && (
                  <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="rgba(6, 182, 212, 0.05)" />
                    <circle cx="200" cy="100" r="30" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="4 2" className="modal-rotate-circle-inner" />
                    <circle cx="200" cy="100" r="50" fill="none" stroke="var(--accent-purple)" strokeWidth="1" strokeDasharray="8 4" className="modal-rotate-circle-outer" />
                    <path d="M50 20 L200 100 L350 20" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" className="modal-flow-line-1" />
                    <path d="M50 180 L200 100 L350 180" stroke="var(--accent-purple)" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" className="modal-flow-line-2" />
                    <circle cx="200" cy="100" r="6" fill="var(--accent-cyan)" className="modal-pulse-box" />
                  </svg>
                )}
              </div>
            </div>
            
            <div className="modal-body-content">
              <h3 className="modal-title">{projectsData[selectedProject].title}</h3>
              
              <div className="modal-info-block">
                <h4 className="modal-section-heading">Problem</h4>
                <p className="modal-text">{projectsData[selectedProject].problem}</p>
              </div>
              
              <div className="modal-info-block">
                <h4 className="modal-section-heading">Solution</h4>
                <p className="modal-text">{projectsData[selectedProject].solution}</p>
              </div>
              
              <div className="modal-info-block">
                <h4 className="modal-section-heading">Technologies Used</h4>
                <div className="modal-tags">
                  {projectsData[selectedProject].technologies.map((tech, idx) => (
                    <span key={idx} className="modal-tag-pill">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="modal-info-block">
                <h4 className="modal-section-heading">Result</h4>
                <p className="modal-text">{projectsData[selectedProject].result}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Certificate Detailed Modal Viewer */}
      {selectedCertificate && (
        <div className="project-modal-backdrop" onClick={() => setSelectedCertificate(null)}>
          <div className="project-modal-card glass-card animate-fade-in" style={{ maxWidth: '650px', padding: '1.5rem' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedCertificate(null)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="modal-body-content" style={{ padding: '0.5rem 0 0 0' }}>
              <h3 className="modal-title" style={{ marginBottom: '0.2rem' }}>{certificationsData[selectedCertificate].title}</h3>
              <p className="modal-text" style={{ color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '1.2rem' }}>
                {certificationsData[selectedCertificate].issuer}
              </p>
              
              <div className="cert-image-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a14' }}>
                <img 
                  src={certificationsData[selectedCertificate].image} 
                  alt={certificationsData[selectedCertificate].title} 
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '11px' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
