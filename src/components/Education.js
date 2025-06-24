import React, { useState } from "react";
import "../styles/Education.css";
import { motion } from "framer-motion";
import { FiBookOpen, FiAward, FiCalendar, FiMapPin, FiStar } from "react-icons/fi";

// Template placeholders for dynamic data
const educationData = {
	education: [ {
  "degree" : "Bachelors of Technology",
  "institution" : "VIT University",
  "year" : "2026"
}, {
  "degree" : "CBSE 12 PCM with Computer Science",
  "institution" : "Sun Valley International School",
  "year" : "2022"
}, {
  "degree" : "CBSE 10",
  "institution" : "Sun Valley International School",
  "year" : "2020"
} ],
	certifications: [ {
  "title" : "Build a Full stack Application using Php with MariaDb and Javascript ",
  "institution" : "1stop.ai",
  "year" : "2024"
}, {
  "title" : "AWS Certification Solutions Architect Associate 2025",
  "institution" : "Udemy",
  "year" : "2025"
}, {
  "title" : "Java crash course",
  "institution" : "Udemy",
  "year" : "2025"
}, {
  "title" : "JavaScript Master course",
  "institution" : "Udemy",
  "year" : "2025"
}, {
  "title" : "Wireshark mastery: Network Traffic Analysis",
  "institution" : "Udemy",
  "year" : "2025"
},{
  "title" : "PHP programming: creating dynamic websites with MYSQL",
  "institution" : "Udemy",
  "year" : "2025"
},
{
  "title" : "OOPS practice Tests",
  "institution" : "udemy",
  "year" : "2025"
} ]
};

const Education = () => {
	const [activeTab, setActiveTab] = useState("education");

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2
			}
		}
	};

	const headingVariants = {
		hidden: { y: -30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: "easeOut" }
		}
	};

	const cardVariants = {
		hidden: { y: 20, opacity: 0, scale: 0.9 },
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: { duration: 0.4, ease: "easeOut" }
		}
	};

	const tabVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: "easeOut" }
		}
	};

	const contentVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" }
		}
	};

	// Function to format description with line breaks
	const formatDescription = (text) => {
		if (!text) return null;

		// Split by double line breaks for paragraphs, single line breaks for lines
		const paragraphs = text.split('\n\n');

		return (
			<div>
				{paragraphs.map((paragraph, index) => (
					<p key={index}>
						{paragraph.split('\n').map((line, lineIndex) => (
							<React.Fragment key={lineIndex}>
								{line}
								{lineIndex < paragraph.split('\n').length - 1 && <br />}
							</React.Fragment>
						))}
					</p>
				))}
			</div>
		);
	};

	const renderEducationCard = (item, index, type) => (
		<motion.div
			key={`${type}-${index}`}
			variants={cardVariants}
			className="education-card"
			whileHover={{
				y: -8,
				scale: 1.02,
				transition: { duration: 0.3 }
			}}
			whileTap={{ scale: 0.98 }}
		>
			<div className="education-container">
				{/* Education-specific Card Header */}
				<div className="education-card-header">
					<span className={`education-type-badge ${type}`}>
						{type === 'education' ? ' Education' : ' Certification'}
					</span>
				</div>

				{/* Title and Institution Row */}
				<div className="education-title-row">
					<h3 className="education-title">
						{item.degree || item.title}
					</h3>
					<p className="education-institution">
						{item.institution}
					</p>
				</div>

				{/* Card Content */}
				<div className="card-content">
					{item.description && (
						<div className="education-desc-container">
							<div className="education-desc">
								{formatDescription(item.description)}
							</div>
						</div>
					)}

					{/* Education Details */}
					{(item.duration || item.location || item.gpa || item.grade) && (
						<div className="education-details">
							{item.duration && (
								<div className="detail-item">
									<FiCalendar className="detail-icon" />
									<span>{item.duration}</span>
								</div>
							)}
							{item.location && (
								<div className="detail-item">
									<FiMapPin className="detail-icon" />
									<span>{item.location}</span>
								</div>
							)}
							{item.gpa && (
								<div className="detail-item">
									<FiStar className="detail-icon" />
									<span className="value-label">GPA:</span>
									<span className="value-amount">{item.gpa}</span>
								</div>
							)}
							{item.grade && (
								<div className="detail-item">
									<FiStar className="detail-icon" />
									<span className="value-label">Grade:</span>
									<span className="value-amount">{item.grade}</span>
								</div>
							)}
						</div>
					)}
				</div>

				{/* Card Footer */}
				<div className="card-footer">
					{/* Subjects/Skills */}
					{item.subjects && Array.isArray(item.subjects) && item.subjects.length > 0 && (
						<div className="education-subjects">
							<div className="education-subjects-label">
								{type === 'education' ? 'Key Subjects' : 'Skills Covered'}
							</div>
							<div className="education-tags">
								{item.subjects.map((subject, i) => (
									<span key={i} className="education-tag">{subject}</span>
								))}
							</div>
						</div>
					)}

					{/* Skills for certifications */}
					{item.skills && Array.isArray(item.skills) && item.skills.length > 0 && (
						<div className="education-subjects">
							<div className="education-subjects-label">Skills</div>
							<div className="education-tags">
								{item.skills.map((skill, i) => (
									<span key={i} className="education-tag">{skill}</span>
								))}
							</div>
						</div>
					)}

					{/* Footer Bottom */}
					<div className="footer-bottom">
						{item.year && (
							<div className="education-year">
								{item.year}
							</div>
						)}

						{/* Status Badge for certifications */}
						{item.status && (
							<div className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
								{item.status}
							</div>
						)}
					</div>
				</div>
			</div>
		</motion.div>
	);

	return (
		<section className="education-section" id="education">
			<div className="container">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
				>
					{/* Section Header - Matching Works */}
					<motion.div variants={headingVariants} className="heading">
						<span className="heading-sub-text">Academic Journey</span>
						<h2 className="heading-text">Education & Certifications</h2>
						<div className="heading-divider"></div>
					</motion.div>

					{/* Tab Buttons - Matching Works */}
					<motion.div variants={tabVariants} className="tabs-container">
						<div className="tab-buttons">
							<button
								className={`tab-btn ${activeTab === "education" ? "active" : ""}`}
								onClick={() => setActiveTab("education")}
							>
								<FiBookOpen className="tab-btn-icon" />
								<span className="tab-btn-label">Education</span>
							</button>
							<button
								className={`tab-btn ${activeTab === "certifications" ? "active" : ""}`}
								onClick={() => setActiveTab("certifications")}
							>
								<FiAward className="tab-btn-icon" />
								<span className="tab-btn-label">Certifications</span>
							</button>
						</div>
					</motion.div>

					{/* Tab Content - Matching Works */}
					<motion.div
						key={activeTab}
						variants={contentVariants}
						initial="hidden"
						animate="visible"
						className="education-content"
					>
						<div className="education-box">
							{activeTab === "education" &&
								educationData.education.map((edu, index) =>
									renderEducationCard(edu, index, "education")
								)
							}

							{activeTab === "certifications" &&
								educationData.certifications.map((cert, index) =>
									renderEducationCard(cert, index, "certifications")
								)
							}
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Education;