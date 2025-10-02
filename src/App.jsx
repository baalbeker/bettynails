import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider}  from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import MainPage from './pages/MainPage';
import Login from './components/Login';
import CalendarBook from './components/CalendarBook';
import PrivateRoute from './components/PrivateRoute';
import GmailMessages from './components/GmailMessages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<CalendarBook />} />
        <Route path="/calendar" element={<PrivateRoute><CalendarBook /></PrivateRoute>} />
        <Route path="/gmail" element={<GmailMessages />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
