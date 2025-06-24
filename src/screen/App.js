import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import '../styles/App.css';
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "../pages/HomePage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timeout);
  }, []);

  const loadText = {
    hidden: {
      opacity: 0,
      scale: 0.94
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.15,
        ease: [0.4, 0.0, 0.2, 1]
      },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.38, ease: [0.4,0,0.2,1] }
    }
  };

  const svgVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.35, ease: [0.4,0,0.2,1] }
    }
  };

  // Dynamic SVG width based on name length
  const name = "Aryan Chauhan";
  const nameLength = name.length;
  const svgWidth = Math.max(320, nameLength * 15 + 100);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          className="loader"
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <motion.div
            className="svg-wrapper"
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <svg height="60" width={svgWidth} xmlns="http://www.w3.org/2000/svg">
              <rect className="shape" height="60" width={svgWidth} />
            </svg>
            <motion.div
              variants={loadText}
              initial='hidden'
              animate='visible'
              exit='exit'
              className="text-container"
            >
              <p className="text-main">{name}</p>
            </motion.div>
          </motion.div>

          {/* Loading Progress Indicator */}
          <motion.div
            className="loading-progress"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: "100%", opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="App"
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, ease: [0.4,0,0.2,1] } }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.4,0,0.2,1] } }}
        >
          <Router>
            <HomePage />
          </Router>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;