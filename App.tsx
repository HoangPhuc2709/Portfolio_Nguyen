import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
// import AIConsultant from './components/AIConsultant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { ContentProvider } from './contexts/ContentContext';

type ViewState = 'home' | 'login' | 'admin';

const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');

  // Navigation Handlers
  const goHome = () => setView('home');
  const goLogin = () => setView('login');
  const goAdmin = () => setView('admin');
  
  // Force scroll to top on mount/reload
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);
  
  if (view === 'login') {
    return <AdminLogin onLogin={goAdmin} onCancel={goHome} />;
  }

  if (view === 'admin') {
    return <AdminDashboard onLogout={goHome} />;
  }

  return (
    <div className="min-h-screen bg-concrete-100 text-concrete-900 font-sans selection:bg-construction-200 selection:text-construction-900">
      <Header onAdminClick={goLogin} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        {/* <AIConsultant /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
};

export default App;