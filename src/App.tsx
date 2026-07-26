import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "@/pages/Home";
import Quest from "@/pages/Quest";
import Talk from "@/pages/Talk";
import Settlement from "@/pages/Settlement";
import Vocabulary from "@/pages/Vocabulary";
import Achievements from "@/pages/Achievements";
import TeamSetup from "@/pages/TeamSetup";
import LanguageToggle from "@/components/LanguageToggle";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.02 },
};

const pageTransition = { duration: 0.4, ease: "easeInOut" as const };

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><Home /></motion.div>} />
        <Route path="/quest" element={<motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><Quest /></motion.div>} />
        <Route path="/talk" element={<motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><Talk /></motion.div>} />
        <Route path="/settlement" element={<motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><Settlement /></motion.div>} />
        <Route path="/vocabulary" element={<motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><Vocabulary /></motion.div>} />
        <Route path="/achievements" element={<motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><Achievements /></motion.div>} />
        <Route path="/team" element={<motion.div variants={pageVariants} initial="initial" animate="in" exit="out" transition={pageTransition}><TeamSetup /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="pixel-world-decor" aria-hidden="true">
        <div className="pixel-cloud pixel-cloud-left" />
        <div className="pixel-cloud pixel-cloud-right" />
        <div className="pixel-hearts"><span>♥</span><span>♥</span><span>♥</span></div>
        <div className="pixel-spark pixel-spark-one" />
        <div className="pixel-spark pixel-spark-two" />
        <div className="pixel-spark pixel-spark-three" />
        <div className="pixel-ground" />
      </div>
      <LanguageToggle />
      <AnimatedRoutes />
    </Router>
  );
}
