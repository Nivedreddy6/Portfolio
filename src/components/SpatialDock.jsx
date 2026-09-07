import React from 'react';

const NAV_ITEMS = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    )
  },
  {
    id: 'certifications',
    label: 'Certs',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    )
  },
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    )
  },
  {
    id: 'achievements',
    label: 'Awards',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34c3.2-1.12 5.5-4.16 5.5-7.66H4.5c0 3.5 2.3 6.54 5.5 7.66z" />
      </svg>
    )
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    )
  }
];

export default function SpatialDock({
  activeSection,
  onNavClick,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  return (
    <>
      <header className="spatial-dock-header">
        <div className="spatial-dock-wrapper">
          {/* Brand Spatial Pill */}
          <a 
            href="#hero" 
            className="spatial-logo-pill"
            onClick={(e) => {
              onNavClick(e, 'hero');
              setIsMobileMenuOpen(false);
            }}
            title="Tamma Nived Reddy"
          >
            <span className="spatial-logo-dot" />
            <span className="spatial-logo-text">NIVED</span>
          </a>

          {/* Floating VisionOS Glass Capsule Dock */}
          <nav className="spatial-dock" aria-label="Spatial Navigation Dock">
            <div className="spatial-dock-capsule">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`spatial-dock-item ${isActive ? 'spatial-dock-item--active' : ''}`}
                    onClick={(e) => onNavClick(e, item.id)}
                    aria-label={item.label}
                    title={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="spatial-dock-icon">{item.icon}</span>
                    <span className="spatial-dock-label">{item.label}</span>
                    {isActive && <span className="spatial-dock-active-glow" />}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className={`spatial-hamburger ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Spatial Drawer (rendered outside header so it covers viewport independently) */}
      <div 
        className={`spatial-mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div 
          className="spatial-mobile-backdrop" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="spatial-mobile-content">
          <div className="spatial-mobile-header">
            <div className="spatial-mobile-brand">
              <span className="spatial-logo-dot" />
              <span className="spatial-logo-text">NIVED REDDY</span>
            </div>
            <button 
              type="button" 
              className="spatial-drawer-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <div className="spatial-mobile-grid">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`spatial-mobile-item ${isActive ? 'spatial-mobile-item--active' : ''}`}
                  onClick={(e) => {
                    onNavClick(e, item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="spatial-dock-icon">{item.icon}</span>
                  <span className="spatial-dock-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
