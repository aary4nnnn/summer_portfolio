import React, { useState, useEffect, useCallback } from "react";
import "../styles/HeroSection.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { AiOutlineArrowUp } from "react-icons/ai";
import { animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";
import CV from "../data/resume.pdf";

const HeroSection = ({ nav, handleNav }) => {
	const [visible, setVisible] = useState(false);
	const [text, setText] = useState("");
	const words = [ "persuing Information Security", " a Full-Stack Developer","good in Java", "a good Problem Solver" ]; 
	const [wordIndex, setWordIndex] = useState(0);
	const [charIndex, setCharIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	const scrollToTop = useCallback(() => {
		scroll.scrollToTop({ 
			smooth: "easeInOutQuint",
			duration: 1000 
		});
	}, []);

	const toggleVisible = useCallback(() => {
		const scrolled = document.documentElement.scrollTop;
		setVisible(scrolled > 300);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", toggleVisible);
		return () => window.removeEventListener("scroll", toggleVisible);
	}, [toggleVisible]);

	useEffect(() => {
		const typingSpeed = isDeleting ? 50 : 100;
		const pauseTime = isDeleting ? 50 : (charIndex === words[wordIndex].length ? 2000 : typingSpeed);

		const timeout = setTimeout(() => {
			if (!isDeleting && charIndex < words[wordIndex].length) {
				setText(words[wordIndex].substring(0, charIndex + 1));
				setCharIndex(prev => prev + 1);
			} else if (isDeleting && charIndex > 0) {
				setText(words[wordIndex].substring(0, charIndex - 1));
				setCharIndex(prev => prev - 1);
			} else if (!isDeleting && charIndex === words[wordIndex].length) {
				setIsDeleting(true);
			} else if (isDeleting && charIndex === 0) {
				setIsDeleting(false);
				setWordIndex(prev => (prev + 1) % words.length);
			}
		}, pauseTime);

		return () => clearTimeout(timeout);
	}, [charIndex, isDeleting, wordIndex, words]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.2
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: "easeOut"
			}
		}
	};

	const buttonVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
				delay: 1
			}
		},
		hover: {
			scale: 1.05,
			transition: { duration: 0.2 }
		},
		tap: {
			scale: 0.95
		}
	};

	const iconVariants = {
		hidden: { opacity: 0, rotate: -180 },
		visible: {
			opacity: 1,
			rotate: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut"
			}
		},
		hover: {
			rotate: 180,
			scale: 1.1,
			transition: { duration: 0.3 }
		}
	};

	return (
		<div className='hero-section' name='home' id='home'>
			<div className='hero-overlay'></div>
			
			<motion.div 
				variants={iconVariants} 
				initial='hidden' 
				animate='visible'
				whileHover='hover'
				onClick={handleNav} 
				className='menu-icon'
			>
				{nav ? <FaTimes /> : <FaBars />}
			</motion.div>

			<motion.div 
				variants={iconVariants}
				initial='hidden'
				animate={visible ? 'visible' : 'hidden'}
				whileHover='hover'
				className={`to-top-icon ${visible ? 'show' : ''}`}
				onClick={scrollToTop}
			>
				<AiOutlineArrowUp />
			</motion.div>

			<motion.div 
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				className='hero-content'
			>
				<motion.p variants={itemVariants} className='hero-intro'>
					<span>Aryan Chauhan</span>
				</motion.p>
				
				<motion.p variants={itemVariants} className='hero-desc'>
					I'm <span className='hero-desc-sub'>{text}</span>
				</motion.p>
			</motion.div>

			<motion.a
				href={CV}
				download='Aryan Chauhan_Resume'
				className='hero-contact'
				variants={buttonVariants}
				initial='hidden'
				animate='visible'
				whileHover='hover'
				whileTap='tap'
			>
				Download CV <BiDownload className='cv-icon' />
			</motion.a>
		</div>
	);
};

export default HeroSection;