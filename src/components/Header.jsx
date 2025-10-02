import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Calendar, Phone, User, LogOut } from 'lucide-react';
import './Header.css';
import { AuthContext } from '../context/AuthContext';
import Login from './Login';
import BookingModal from '../components/BookingModal';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user) setIsLoginModalOpen(false);
  }, [user]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Начало', icon: null },
    { path: '/services', label: 'Услуги', icon: null },
    { path: '/gallery', label: 'Галерия', icon: null },
    { path: '/about', label: 'За нас', icon: null },
    { path: '/contact', label: 'Контакт', icon: Phone }
  ];

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <motion.div
              className="logo-content"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="logo-icon" />
              <div className="logo-text">
                <span className="logo-name">BettyNails</span>
                <span className="logo-tagline">Beauty Studio</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
                {isActive(item.path) && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}

            {/* Auth Section */}
            <div className="auth-section">
              {user ? (
                <div className="user-menu">
                  <motion.button
                    className="user-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User size={16} />
                    <span>{user.displayName}</span>
                  </motion.button>
                  {/* Calendar button - only visible for admin */}
                  {/* {user.displayName === "Бетина Борилова" && (
                    <Link to="/calendar">
                      <motion.button
                        className="calendar-button btn btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Calendar size={16} />
                        <span>Calendar</span>
                      </motion.button>
                    </Link>
                  )} */}
                  <motion.button
                    className="logout-button"
                    onClick={logout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut size={16} />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  className="login-button"
                  onClick={toggleLoginModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User size={16} />
                  <span>Login</span>
                </motion.button>
              )}

              <motion.button
                className="book-button btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openBookingModal}
              >
                <Calendar size={16} />
                <span>Запази час</span>
              </motion.button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-button"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mobile-nav-content">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      {item.icon && <item.icon size={20} />}
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="mobile-auth-section"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  {user ? (
                    <>
                      <div className="mobile-user-info">
                        <User size={20} />
                        <span>{user.displayName}</span>
                      </div>

                      <button className="mobile-logout-button" onClick={logout}>
                        <LogOut size={20} />
                        <span>Изход</span>
                      </button>
                    </>
                  ) : (
                    <button className="mobile-login-button" onClick={toggleLoginModal}>
                      <User size={20} />
                      <span>Login</span>
                    </button>
                  )}

                  {/* <button className="mobile-book-button btn btn-primary" onClick={openBookingModal}>
                    <Calendar size={20} />
                    <span>Запази час</span>
                  </button> */}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div
            className="login-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleLoginModal}
          >
            <motion.div
              className="login-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="login-modal-close" onClick={toggleLoginModal}>
                <X size={24} />
              </button>
              <Login />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isBookingModalOpen && <BookingModal onClose={closeBookingModal} />}
    </>
  );
}

export default Header;
