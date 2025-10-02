import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  Star,
  CheckCircle,
  AlertCircle,
  Heart,
  HelpCircle
} from 'lucide-react';
import emailjs from 'emailjs-com';
import './Contact.css';

function GoogleMap() {
  return (
    <div className="map-container">
      <h3>Намерете ни тук</h3>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d443.7941639635246!2d27.92718357111256!3d43.21327040544919!2m3!1f205.09379364285903!2f0!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x40a45411fb9a457f%3A0xcc7619afa3e9cd16!2z0JLQsNGA0L3QsCDQptC10L3RgtGK0YDQn9GA0LjQvNC-0YDRgdC60LgsINGD0LsuIOKAntCS0LDRgdC40Lsg0JrRitC90YfQtdCy4oCcIDEzLCA5MDAyINCS0LDRgNC90LA!5e1!3m2!1sbg!2sbg!4v1736686871218!5m2!1sbg!2sbg"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <p>Ще се радваме да ви посрещнем на място!</p>
      <p>Адрес: ул. „Васил Кънчев" 13, 9000 Варна</p>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const businessHours = [
    { day: 'Понеделник', hours: '10:00 - 19:00' },
    { day: 'Вторник', hours: '10:00 - 19:00' },
    { day: 'Сряда', hours: '10:00 - 19:00' },
    { day: 'Четвъртък', hours: '10:00 - 19:00' },
    { day: 'Петък', hours: '10:00 - 19:00' },
    { day: 'Събота', hours: '10:00 - 17:00' },
    { day: 'Неделя', hours: 'Затворено' }
  ];

  const faqs = [
    {
      question: 'Колко време отнема гел маникюрът?',
      answer: 'Стандартният гел маникюр отнема около 90 минути.'
    },
    {
      question: 'Колко дълго издържа гел лакът?',
      answer: 'При правилна грижа, гел лакът може да издърши 2-3 седмици без отлепване.'
    },
    {
      question: 'Предлагате ли услуги за мъже?',
      answer: 'Да, предлагаме специализирани услуги за мъже, включително маникюр и педикюр.'
    },
    {
      question: 'Какво включва 7-дневната гаранция?',
      answer: 'В случай на отлепване или повреда в първите 7 дни, предлагаме безплатно поправяне.'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Името е задължително';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Имейлът е задължителен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Невалиден имейл адрес';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефонът е задължителен';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Съобщението е задължително';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    emailjs
      .sendForm(
        'service_7e8kpnw',
        'template_sl2yv8o',
        e.target,
        '5IeT4qBP4BGNiSsDc'
      )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="contact-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MessageCircle size={16} />
              <span>Контакт</span>
            </motion.div>

            <h1>Свържете се с нас</h1>
            <p className="contact-description">
              Имате въпроси или искате да запазите час? Свържете се с нас по удобния за вас начин.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section section">
        <div className="container">
          <div className="contact-info-grid">
            <motion.div
              className="contact-info-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <h3>Телефон</h3>
              <p>0898 75 4518</p>
              <a href="tel:+359881234567" className="contact-link">
                Обади се сега
              </a>
            </motion.div>

            <motion.div
              className="contact-info-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <h3>Имейл</h3>
              <p>betinaborilova3@gmail.com</p>
              <a href="mailto:betinaborilova3@gmail.com" className="contact-link">
                Изпрати имейл
              </a>
            </motion.div>

            <motion.div
              className="contact-info-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <h3>Адрес</h3>
              <p>ул. „Васил Кънчев" 13<br />9000 Варна</p>
              <a href="https://goo.gl/maps/example" target="_blank" rel="noopener noreferrer" className="contact-link">
                Виж в картата
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="contact-form-grid">
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="form-header">
                <h2>Изпратете ни съобщение</h2>
                <p>Попълнете формата и ще се свържем с вас възможно най-скоро</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Име *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Вашето име"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Имейл *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Телефон *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="0000 00 0000"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Интересуваща услуга</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Изберете услуга</option>
                    <option value="gel-manicure">Гел маникюр</option>
                    <option value="gel-extensions">Гел удължаване</option>
                    <option value="nail-art">Nail Art</option>
                    <option value="pedicure">Педикюр</option>
                    <option value="other">Друго</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Съобщение *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Вашето съобщение..."
                    rows="4"
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-lg submit-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  <span>Изпрати съобщение</span>
                </motion.button>

                {status === 'success' && (
                  <motion.div
                    className="status-message success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle size={20} />
                    <span>Съобщението е изпратено успешно!</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    className="status-message error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle size={20} />
                    <span>Възникна грешка. Моля, опитайте отново.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div
              className="map-wrapper"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GoogleMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="business-hours-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Работно време</h2>
            <p>Посетете ни в удобно за вас време</p>
          </motion.div>

          <div className="hours-grid">
            {businessHours.map((schedule, index) => (
              <motion.div
                key={schedule.day}
                className={`hours-item ${schedule.day === 'Неделя' ? 'closed' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="day">{schedule.day}</span>
                <span className="hours">{schedule.hours}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Често задавани въпроси</h2>
            <p>Отговори на най-честите въпроси от нашите клиенти</p>
          </motion.div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="faq-question">
                  <HelpCircle size={20} />
                  <h3>{faq.question}</h3>
                </div>
                <p className="faq-answer">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-section section">
        <div className="container">
          <motion.div
            className="social-content text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Последвайте ни в социалните мрежи</h2>
            <p>Вижте нашите най-нови работи и получете вдъхновение за вашия следващ nail art</p>
            
            <div className="social-links">
              <motion.a
                href="https://www.instagram.com/beti_nails_varna/profilecard/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={24} />
                <span>Instagram</span>
              </motion.a>
              
              <motion.a
                href="https://www.facebook.com/profile.php?id=61556637756480"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link facebook"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={24} />
                <span>Facebook</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;