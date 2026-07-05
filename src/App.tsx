import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Footer } from './components/ui/Footer';
import { Navbar } from './components/ui/Navbar';
import { useDarkMode } from './hooks/useDarkMode';
import { AssessmentPage } from './pages/AssessmentPage';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPage } from './pages/LandingPage';
import { ProcessingPage } from './pages/ProcessingPage';

function AnimatedRoutes() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {isLanding && <Footer />}
    </>
  );
}

function App() {
  const { isDark, toggle } = useDarkMode();

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
        <Navbar isDark={isDark} onToggleTheme={toggle} />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
