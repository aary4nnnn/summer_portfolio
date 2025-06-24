import React from "react";
import "../styles/Skills.css";
import { motion } from "framer-motion";

const SkillsData = [ {
  "category" : "Programming Languages",
  "skills" : [{
    "name" : "Java",
    "icon" : "java.png"
  }, {
    "name" : "C",
    "icon" : "c.png"
  },
  {
    "name" : "JavaScript",
    "icon" : "javascript.png"
  } ]
}, {
  "category" : "Information security(Penetration testing)",
  "skills" : [ {
    "name" : "Kali Linux",
    "icon" : "kalilinux.png"
  }, {
    "name" : "Linux, Ubuntu",
    "icon" : "ubuntu.png"
  }, {
    "name" : "Metasploitable2",
    "icon" : "meta.png"
  } ]
}, {
  "category" : "Web & Cloud Tools",
  "skills" : [ {
    "name" : "Git",
    "icon" : "git.png"
  }, {
    "name" : "GitHub",
    "icon" : "github.png"
  }, {
    "name" : "Netlify",
    "icon" : "netlify.png"
  } ]
}, {
  "category" : "Databases & IDEs",
  "skills" : [ {
    "name" : "MySQL",
    "icon" : "mysql.png"
  }, {
    "name" : "PhpMyAdmin",
    "icon" : "php.png"
  }, {
    "name" : "MariaDB",
    "icon" : "maria.png"
  }, {
    "name" : "PostgreSQL",
    "icon" : "postgresql.png"
  } ]
}, {
  "category" : "Design & Prototyping",
  "skills" : [ {
    "name" : "Figma",
    "icon" : "figma.png"
  } ]
 },
// {
//   "category" : "Video & Audio Editing",
//   "skills" : [ {
//     "name" : "Blender",
//     "icon" : "blender.png"
//   }, {
//     "name" : "Camtasia",
//     "icon" : "camtasia.png"
//   }, {
//     "name" : "Audition",
//     "icon" : "audition.png"
//   } ]
// }, 
{
  "category" : "Productivity Tools",
  "skills" : [ {
    "name" : "Star Uml",
    "icon" : "star_uml.png"
  }, {
    "name" : "LaTeX",
    "icon" : "latex.png"
  } ]
}, 
// {
//   "category" : "Game & Simulation",
//   "skills" : [ {
//     "name" : "Unity",
//     "icon" : "unity.png"
//   } ]
// }
 ];

// Fallback icon resolver
const resolveIcon = (icon) => {
  try {
    return require(`../images/${icon}`);
  } catch (error) {
    // Simple SVG placeholder for missing icons
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="60" height="60" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="72" height="72" rx="12" fill="#ececec" />
        <text x="36" y="40" text-anchor="middle" fill="#bbb" font-size="24">?</text>
      </svg>
    `)}`;
  }
};

const Skills = () => {
  // Calculate total number of skills
  const totalSkills = SkillsData.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0);

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

  const categoryVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const skillVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="skills-wrapper">
          {/* Section Header */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="heading"
          >
            <span className="heading-sub-text">Technical Expertise</span>
            <h2 className="heading-text">Skills & Technologies</h2>
            <div className="heading-divider"></div>
          </motion.div>

          {/* Skills Categories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="skills-categories"
          >
            {SkillsData.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={categoryVariants}
                className="skill-category-block"
              >
                <h3 className="category-title">{category.category}</h3>
                <div className="category-divider"></div>
                <div className="skills-grid simple-skill-icons">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={skillVariants}
                      className="simple-skill"
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        className="skill-img"
                        src={resolveIcon(skill.icon)}
                        alt={skill.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                        loading="lazy"
                      />
                      <p className="skill-name">{skill.name}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Total Skills Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="skills-summary"
          >
            <div className="skills-total">
              Total Skills: {totalSkills}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;