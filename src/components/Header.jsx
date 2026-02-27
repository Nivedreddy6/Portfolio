import React, { useEffect, useState } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={scrolled ? "scrolled" : ""}>
            <div className="header-inner">
                <a href="#home" className="logo">NIVED</a>
                <nav>
                    <a href="#about">Init</a>
                    <a href="#skills">Specs</a>
                    <a href="#projects">Logs</a>
                    <a href="#contact">Ping</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
