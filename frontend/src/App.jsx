import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userStore } from "./store/useStore";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/Password';
import ResetPassword from './pages/Reset';
import Verify from './pages/verifyOtp';
import Loader from './components/Loader';
import Dashboard from './pages/Dashboard';
import Settings from './pages/settings';
import SetupProfile from './pages/SetupProfile';
import Projects from './pages/Projects';
import Collections from './pages/Collections';
import Journal from './pages/Journal';
import Explore from './pages/Explore';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import SupportCategory from './pages/Supportcategory';
import SupportArticle from './pages/Supportarticle';
import Community from './pages/Community';
import ToasterProvider from './components/ToasterProvider';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [loading, setLoading] = useState(true);
  const checkAuth = userStore((s) => s.checkAuth);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  if (loading) return <Loader />;
  return (
    <div>
      <BrowserRouter>
        <ToasterProvider />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/setup" element={<SetupProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support/:categoryId" element={<SupportCategory />} />
          <Route path="/support/:categoryId/:articleId" element={<SupportArticle />} />
          <Route path="/community" element={<Community />} />
        </Routes>

      </BrowserRouter>
    </div>
  )

}

export default App;