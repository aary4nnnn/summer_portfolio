import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Contact.css";
import { 
    FiMail,
    FiMapPin,
    FiSend,
    FiUser,
    FiMessageSquare
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Only whatsapp (from socialLinks), both emails, and location
const defaultSocialLinks = {
    whatsapp: "https://wa.me/917678262782"
};

const Contact = ({
    aboutParagraph1 = "",
    email = "aryan1582004@gmail.com",
    altEmail = "aryan.chauhan2022@vitstudent.ac.in",
    phone = "+91 7678262782",
    location = "Ghaziabad, UP, India",
    socialLinks = defaultSocialLinks
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Only check for non-empty value, not template
    const isValidValue = (val) => !!val && val !== "";

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields");
            setIsSubmitting(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            setIsSubmitting(false);
            return;
        }

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success("Thank you! Your message has been sent successfully.");
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Build contact info array (always show, but disabled if value is not set)
    const contactInfo = [
        {
            icon: <FiMail />,
            title: "Email",
            value: isValidValue(email) ? email : "Not Provided",
            link: isValidValue(email) ? `mailto:${email}` : null,
            disabled: !isValidValue(email),
        },
        {
            icon: <FiMail />,
            title: "Alternative Email",
            value: isValidValue(altEmail) ? altEmail : "Not Provided",
            link: isValidValue(altEmail) ? `mailto:${altEmail}` : null,
            disabled: !isValidValue(altEmail),
        },
        {
            icon: <FaWhatsapp />,
            title: "WhatsApp",
            value: isValidValue(phone) ? phone : "Not Provided",
            link: isValidValue(socialLinks.whatsapp) ? socialLinks.whatsapp : null,
            disabled: !isValidValue(socialLinks.whatsapp),
        },
        {
            icon: <FiMapPin />,
            title: "Location",
            value: isValidValue(location) ? location : "Not Provided",
            link: null,
            disabled: !isValidValue(location),
        }
    ];

    return (
        <section className="contact" id="contact">
            <div className="container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="contact-wrapper"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="heading">
                        <span className="heading-sub-text">Let's Connect</span>
                        <h2 className="heading-text">Get in Touch</h2>
                        <div className="heading-divider"></div>
                    </motion.div>

                    {/* Contact Content */}
                    <div className="contact-content">
                        {/* Left Side - Contact Info */}
                        <motion.div variants={itemVariants} className="contact-info">
                            <div className="info-header">
                                <h3>Let's Work Together</h3>
                                <p>
                                    {aboutParagraph1 ||
                                        "I'm available for consulting and services. Whether you need assistance with your projects or have any questions, I'm here to help."
                                    }
                                </p>
                            </div>

                            <div className="contact-details">
                                {contactInfo.map((item, index) =>
                                    item.link && !item.disabled ? (
                                        <motion.a
                                            key={index}
                                            href={item.link}
                                            target={item.link && item.link.startsWith('http') ? "_blank" : "_self"}
                                            rel={item.link && item.link.startsWith('http') ? "noopener noreferrer" : ""}
                                            className="contact-item"
                                            whileHover={{ x: 10, scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="contact-icon">
                                                {item.icon}
                                            </div>
                                            <div className="contact-text">
                                                <span className="contact-title">{item.title}</span>
                                                <span className="contact-value">{item.value}</span>
                                            </div>
                                        </motion.a>
                                    ) : (
                                        <motion.div
                                            key={index}
                                            className="contact-item contact-item--disabled"
                                            style={{ pointerEvents: "none", opacity: 0.5 }}
                                        >
                                            <div className="contact-icon">{item.icon}</div>
                                            <div className="contact-text">
                                                <span className="contact-title">{item.title}</span>
                                                <span className="contact-value">{item.value}</span>
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </motion.div>

                        {/* Right Side - Contact Form */}
                        <motion.div variants={itemVariants} className="contact-form-container">
                            <div className="form-header">
                                <h3>Send Me a Message</h3>
                                <p>Fill out the form below and I'll get back to you as soon as possible.</p>
                            </div>

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <FiUser className="label-icon" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <FiMail className="label-icon" />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">
                                        <FiMessageSquare className="label-icon" />
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">
                                        <FiMessageSquare className="label-icon" />
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell me about your project or requirements..."
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <span className="loading">
                                            <div className="spinner"></div>
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="send">
                                            <FiSend className="btn-icon" />
                                            Send Message
                                        </span>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </section>
    );
};

export default Contact;