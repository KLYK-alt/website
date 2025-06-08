'use client'
import React, { useState, useEffect } from 'react'
import nav from '../data/nav'
import Link from 'next/link';
import './nav.css';
import { usePathname } from 'next/navigation';

export default function Nav() {
    const [scroll, setScroll] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        const navbarCollapse = document.getElementById('navbarDefault');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse) {
            navbarCollapse.classList.toggle('show');
        }
        if (navbarToggler) {
            navbarToggler.classList.toggle('active');
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const navbarCollapse = document.getElementById('navbarDefault');
            const navbarToggler = document.querySelector('.navbar-toggler');
            
            if (isMenuOpen && 
                navbarCollapse && 
                !navbarCollapse.contains(event.target) && 
                !navbarToggler.contains(event.target)) {
                setIsMenuOpen(false);
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.remove('active');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
        const navbarCollapse = document.getElementById('navbarDefault');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
        }
        if (navbarToggler) {
            navbarToggler.classList.remove('active');
        }
    }, [pathname]);

    return (
        <nav className={`navbar navbar-default navbar-expand-lg fixed-top ${scroll > 100 ? 'navbar-raduce' : 'navbar-trans'}`}>
            <div className="container">
                {/* Left: Brand (logo) */}
                <a
                    className="navbar-brand text-brand"
                    href="/"
                >
                    <img
                        src="/images/logo.png"
                        alt="KLYK Logo"
                        style={{ height: '120px', objectFit: 'contain' }}
                    />
                </a>

                {/* Center: Nav items */}
                <div
                    className="navbar-collapse collapse justify-content-center"
                    id="navbarDefault"
                >
                    <ul className="navbar-nav">
                        {nav.map((item) => (
                            <li className="nav-item" key={item.id}>
                                <Link
                                    className={`nav-link${pathname === item.link ? ' active' : ''}`}
                                    href={item.link}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Toggle navigation"
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
