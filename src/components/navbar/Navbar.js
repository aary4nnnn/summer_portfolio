import React, { useState, useEffect, useCallback } from "react";
import "../../styles/Navbar.css";
import { FaHome, FaLaptop } from "react-icons/fa";
import { BiBookContent, BiServer, BiEnvelope } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import NavLinksJs from "./NavLinks";
import profilePicSmall from "../../images/profile_me.jpg";

const navigationItems = [
    { to: "home", icon: FaHome, label: "Home" },
    { to: "about", icon: FiUser, label: "About" },
    { to: "skills", icon: FaLaptop, label: "Skills" },
    { to: "education", icon: BiServer, label: "Education" },
    { to: "works", icon: BiBookContent, label: "Works" },
    { to: "contact", icon: BiEnvelope, label: "Contact" },
];

// Social links object for backend replacement
const socialLinks = {
    instagram: "https://www.instagram.com/aary4nnnn/",
    linkedin: "https://www.linkedin.com/in/aryan-chauhan-544502247/",
    github: "https://github.com/aary4nnnn",
    twitter: "",
    email: "aryan1582004@gmail.com"
};

const navVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
            staggerDirection: 1,
        },
    },
};

const itemVariants = {
    hidden: { x: -20, opacity: 0, transition: { duration: 0.3 } },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const profileVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1, opacity: 1,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
};

const Navbar = ({ nav, handleNav }) => {
    const [activeSection, setActiveSection] = useState("home");

    const handleScroll = useCallback(() => {
        try {
            const sections = navigationItems.map(item => item.to);
            const scrollPosition = window.scrollY + 100;
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        } catch (error) {
            console.warn("Scroll handler error:", error);
        }
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
        }, 60);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    const handleNavClick = useCallback((section) => {
        setActiveSection(section);
        if (handleNav) handleNav();
    }, [handleNav]);

    const scrollToSection = useCallback((section) => {
        try {
            const element = document.getElementById(section);
            if (element) {
                const offset = 70;
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.warn("Scroll to section error:", error);
        }
    }, []);

    const handleLinkClick = useCallback((section) => {
        handleNavClick(section);
        scrollToSection(section);
    }, [handleNavClick, scrollToSection]);

    return (
        <AnimatePresence>
            {nav && (
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="navbar active"
                >
                    <motion.div
                        variants={navVariants}
                        className="navbar-container"
                    >
                        {/* Top Profile Section */}
                        <motion.div variants={profileVariants} className="top-details">
                            <motion.div
                                className="img__cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={profilePicSmall}
                                    alt="Aryan Chauhan Profile"
                                    className="profile-pic-small"
                                    loading="lazy"
                                />
                            </motion.div>

                            <button
                                onClick={() => handleLinkClick("home")}
                                className="profile-name"
                                type="button"
                            >
                                Aryan Chauhan
                            </button>

                            {/* Pass socialLinks so NavLinks always works! */}
                            <NavLinksJs handleNav={handleNav} socialLinks={socialLinks} />
                        </motion.div>

                        {/* Navigation Links */}
                        <motion.ul className="mid-details">
                            {navigationItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <motion.div
                                        key={item.to}
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        <button
                                            onClick={() => handleLinkClick(item.to)}
                                            className={`mid-links ${activeSection === item.to ? 'active' : ''}`}
                                            type="button"
                                        >
                                            <IconComponent className="mid-icon" />
                                            <span className="mid-link">{item.label}</span>
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </motion.ul>

                        {/* Footer */}
                        <motion.div variants={itemVariants} className="copy">
                            <small className="copyright">
                                © Copyright ©{new Date().getFullYear()}<br />
                                All rights reserved
                            </small>
                        </motion.div>
                    </motion.div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;