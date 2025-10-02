import './MainPage.css';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Calendar,
  Phone,
  Star,
  Sparkles,
  Heart,
  Award,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle,
  Crown,
  Palette
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import BookingModal from '../components/BookingModal';
import GallerySection from '../components/GallerySection';
import { FaInstagram, FaFacebookSquare } from 'react-icons/fa';
import headerimage from "../assets/header.jpg"

const MainPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const openServicesPage = () => navigate('/services');
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);
  const callPhone = () => window.open('tel:359898754518');
  const goToCalendar = () => navigate('/calendar');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Професионален Nail Art",
      description: "Експертни дизайни, създадени специално за вашия стил"
    },
    {
      icon: Heart,
      title: "Луксозно преживяване",
      description: "Отпуснете се в нашата премиум салонна среда"
    },
    {
      icon: Award,
      title: "Качествени продукти",
      description: "Използваме само най-добрите продукти за грижа за ноктите"
    }
  ];

  const stats = [
    { number: "100+", label: "Доволни клиенти" },
    // { number: "3+", label: "Години опит" },
    // { number: "50+", label: "Nail Art дизайна" },
    { number: "5★", label: "Средна оценка" }
  ];

  return (
    <div className="main-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <motion.div
            className="hero-bg-layer"
            style={{ y: y1 }}
          />
        </div>

        <div className="hero-content container">
          <motion.div
            className="hero-text"
            // style={{ opacity }}
            // initial={{ opacity: 0, y: 50 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Sparkles size={16} />
              <span>Премиум салон за нокти</span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Красиви нокти,
              <br />
              <span className="gradient-text">твоят стил</span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Насладете се на луксозна грижа за ноктите с нашите експертни техници.
              От класически маникюр до зашеметяващ nail art - въплътяваме вашата визия в реалност.
            </motion.p>

<motion.div
  className="hero-buttons"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
>
  <div className="hero-top-buttons">
    {user && (
      <button className="btn btn-primary btn-lg hero-cta" onClick={goToCalendar}>
        <Calendar size={20} />
        <span>Календар</span>
      </button>
    )}
    <button className="btn btn-primary btn-lg hero-cta" onClick={openBookingModal}>
      <Calendar size={20} />
      <span>Запази час</span>
    </button>
  </div>

  <button className="btn btn-secondary btn-lg hero-services" onClick={openServicesPage}>
    <span>Виж услугите</span>
    <ChevronRight size={20} />
  </button>
</motion.div>


<motion.div
  style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
    <Phone size={16} />
    <span>Тел: 0898 75 4518</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
    <MapPin size={16} />
    <span>ул. „Васил Кънчев" 13, Варна</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
    <Clock size={16} />
    <span>Понеделник - Петък: 10:00 - 19:00</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px',marginLeft: '23px' }}>
    <span>Събота: 10:00 - 17:00</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px',marginLeft: '23px' }}>
    <span>Неделя: Почивен ден</span>
  </div>
</motion.div>

          </motion.div>

          <motion.div
            className="hero-visual"
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-image-container">
              <div className="floating-elements">
                <motion.div
                  className="floating-element"
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles size={24} />
                </motion.div>
                <motion.div
                  className="floating-element"
                  animate={{
                    y: [10, -10, 10],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <Heart size={20} />
                </motion.div>
                <motion.div
                  className="floating-element"
                  animate={{
                    y: [-5, 15, -5],
                    rotate: [0, 3, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  <Star size={18} />
                </motion.div>
              </div>

              <img
                src= {headerimage}
                alt="Luxury Nail Salon"
                className="hero-image"
              />

              <div className="hero-stats">
                <div className="stat-card">
                  <Star className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">4.9</span>
                    <span className="stat-label">Оценка</span>
                  </div>
                </div>
                <div className="stat-card">
                  <Heart className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Доволни клиенти</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

<div className="hero-social">
  <motion.a
    href="https://www.instagram.com/beti_nails_varna/profilecard/"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: "20%",
      color: "pink",
      cursor: "pointer",
      background: "white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      textDecoration: "none",
      transition: "all 0.3s ease",
    }}
  >
    <FaInstagram size={30} />
  </motion.a>

  <motion.a
    href="https://www.facebook.com/profile.php?id=61556637756480"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: "20%",
      color: "pink",
      cursor: "pointer",
      background: "white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      textDecoration: "none",
      transition: "all 0.3s ease",
    }}
  >
    <FaFacebookSquare size={30} />
  </motion.a>
</div>


      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Защо да изберете BettyNails</h2>
            <p>Почувствайте разликата с нашите премиум услуги за грижа за ноктите</p>
          </motion.div>

          <div className="features-grid grid grid-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid grid grid-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Какво казват нашите клиенти</h2>
            <p>Прочетете мненията на хората, които избраха BettyNails</p>
          </motion.div>

          <div className="testimonials-grid grid grid-3">
            {[
              {
                name: "Мария Петрова",
                rating: 5,
                text: "Невероятно професионално обслужване! Нокътите ми изглеждат перфектно всеки път. Препоръчвам на всички!",
                service: "Гел маникюр"
              },
              {
                name: "Анна Николова",
                rating: 5,
                text: "Най-добрият салон във Варна! Артистичното изпълнение и вниманието към детайлите са безподобни.",
                service: "Nail Art"
              },
              {
                name: "Елена Димитрова",
                rating: 5,
                text: "Прекрасна атмосфера и изключително умели специалисти. Винаги съм доволна от резултата!",
                service: "Педикюр"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="testimonial-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="featured-services-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Популярни услуги</h2>
            <p>Най-търсените ни услуги за красиви нокти</p>
          </motion.div>

          <div className="featured-services-grid grid grid-3">
            {[
              {
                icon: Sparkles,
                title: "Манкикюр с гел лак",
                price: "45 лв",
                duration: "90 мин",
                description: "Маникюр с гел лак, третиране на кожичките и масаж на ръцете",
                popular: true
              },
              {
                icon: Crown,
                title: "Изграждане",
                price: "от 75 лв",
                duration: "~180 мин",
                description: "Професионално удължаване на ноктите с възможност за персонализирана дължина",
                popular: false
              },
              {
                icon: Palette,
                title: "Nail Art",
                price: "от 3 лв/нокът",
                duration: "10 мин/нокът",
                description: "Ръчно рисувани дизайни, създадени специално според вашия стил",
                popular: true
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className={`featured-service-card card ${service.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {service.popular && (
                  <div className="popular-badge">
                    <Star size={14} />
                    <span>Популярно</span>
                  </div>
                )}
                
                <div className="service-icon">
                  <service.icon size={32} />
                </div>
                
                <h3>{service.title}</h3>
                <div className="service-meta">
                  <span className="service-price">{service.price}</span>
                  <span className="service-duration">
                    <Clock size={14} />
                    {service.duration}
                  </span>
                </div>
                
                <p>{service.description}</p>
                
                <button 
                  className="btn btn-primary btn-sm service-book-btn"
                  onClick={openBookingModal}
                >
                  <Calendar size={16} />
                  <span>Запази час</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Enhanced CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="cta-text">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Готови за вашия следващ маникюр?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Запазете час днес и се насладете на професионална грижа за вашите нокти
              </motion.p>
            </div>
            
            <motion.div
              className="cta-actions"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <button 
                className="btn btn-primary btn-lg cta-book"
                onClick={openBookingModal}
              >
                <Calendar size={20} />
                <span>Запази час</span>
              </button>
              <button 
                className="btn btn-secondary btn-lg cta-call"
                onClick={callPhone}
              >
                <Phone size={20} />
                <span>Обади се</span>
              </button>
            </motion.div>
            
            <motion.div
              className="cta-benefits"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="benefit-item">
                <CheckCircle size={16} />
                <span>7-дневна гаранция</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={16} />
                <span>Лично отношение</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={16} />
                <span>Професионални продукти</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Booking Modal */}
      {isBookingModalOpen && <BookingModal onClose={closeBookingModal} />}
    </div>
  );
};

export default MainPage;
