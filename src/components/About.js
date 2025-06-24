import React, { useState } from "react";
import "../styles/About.css";
import { motion } from "framer-motion";
import profilePic from "../images/profile_me.jpg";

const About = ({
	name = "Aryan Chauhan",
	about = "Final year CSE student at Vellore Institute of Technology",
	aboutParagraph1 = "I am Aryan Chauhan, a Software Engineer Intern at Dactilar Technologies, contributing to web-based applications using PHP, CodeIgniter, and MySQL. Currently pursuing my btech in Computer Science Engineering (Information Security) at VIT with a CGPA of 8.73",
	aboutParagraph2 = "I combine development skills with a passion for cybersecurity and full-stack development. I have hands-on experience with technologies like Java, React.js, Node.js, and MariaDB, and have built multiple projects ranging from personal portfolio websites to secure authentication systems using OAuth, bcrypt, and JWT",
	aboutParagraph3 = "My leadership roles in hackathons and student organizations reflect my ability to deliver solutions through collaboration and problem-solving.",
	aboutParagraph4 = "Outside of my technical work, I enjoy exploring penetration testing using Kali Linux, participating in hackathons, and continuously improving my problem-solving abilities through competitive programming and data structures & algorithms. I also have a keen interest in creating clean, user-friendly web interfaces. My long-term goal is to grow as a full-stack developer with a strong focus on secure coding practices, eventually contributing to projects that merge software engineering with cybersecurity. I am driven by curiosity, continuous learning, and the desire to build impactful, secure, and scalable digital solutions.",
	professionalStats = [ {
  "number" : "8.73",
  "label" : "CGPA"
}, {
  "number" : "10+",
  "label" : " Projects Completed"
} ]
}) => {
	const [imageLoaded, setImageLoaded] = useState(false);

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

	const fadeInUp = {
		hidden: {
			y: 60,
			opacity: 0
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut"
			}
		}
	};

	const fadeInLeft = {
		hidden: {
			x: -80,
			opacity: 0
		},
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut"
			}
		}
	};

	const fadeInRight = {
		hidden: {
			x: 80,
			opacity: 0
		},
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut"
			}
		}
	};

	const imageVariants = {
		hidden: {
			scale: 0.8,
			opacity: 0
		},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 1,
				ease: "easeOut"
			}
		}
	};

	const stats = professionalStats;

	return (
		<section className="about" id="about">
			<div className="container">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					className="about-wrapper"
				>
					{/* Section Header */}
					<motion.div variants={fadeInUp} className="heading">
						<span className="heading-sub-text">Get to know me</span>
						<h2 className="heading-text">About Me</h2>
						<div className="heading-divider"></div>
					</motion.div>

					{/* Main Content */}
					<div className="split-about">
						<motion.div
							variants={fadeInLeft}
							className="about-content"
						>
							<div className="content-text">
								<p className="intro-text">
									Hello! I'm <span className="highlight">{name}</span>
								</p>
								{aboutParagraph1 && <p>{aboutParagraph1}</p>}
								{aboutParagraph2 && <p>{aboutParagraph2}</p>}
								{aboutParagraph3 && <p>{aboutParagraph3}</p>}
								{aboutParagraph4 && <p>{aboutParagraph4}</p>}
							</div>
						</motion.div>

						<motion.div
							variants={fadeInRight}
							className="about-visual"
						>
							{/* Profile Image */}
							<div className="image-container">
								<motion.div
									variants={imageVariants}
									className="about-img"
								>
									<img
										src={profilePic}
										alt={`${name} - ${about}`}
										onLoad={() => setImageLoaded(true)}
										className={imageLoaded ? 'loaded' : ''}
									/>
									<div className="image-overlay"></div>
								</motion.div>
							</div>

							{/* Stats Section */}
							<div className="stats-container">
								{stats.map((stat, index) => (
									<motion.div
										key={stat.label}
										className="stat-item"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1, duration: 0.6 }}
										viewport={{ once: true }}
										whileHover={{ scale: 1.05 }}
									>
										<div className="stat-number">{stat.number}</div>
										<div className="stat-label">{stat.label}</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default About;