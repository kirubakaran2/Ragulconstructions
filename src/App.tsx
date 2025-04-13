import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import CustomCursor from './components/CustomCursor';
import { Scroll } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
function App() {
  return (
    
    <BrowserRouter>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <NavBar />
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/admin-signin" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App