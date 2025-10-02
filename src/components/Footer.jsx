import './Footer.css';
import { FaInstagram, FaFacebookSquare, FaPhone, FaMapMarkerAlt, FaClock, FaHeart } from "react-icons/fa";
import { motion } from 'framer-motion';

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="footer-content">
        <div className="footer-main">
          <motion.div className="footer-section footer-brand" variants={itemVariants}>
            <h3>BettNails</h3>
            <p>Вашата красота е наша страст. Създаваме уникални дизайни за нокти, които отразяват вашата индивидуалност.</p>
            <div className="footer-social">
              <motion.a
                href="https://www.instagram.com/beti_nails_varna/profilecard/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/profile.php?id=61556637756480"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebookSquare />
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="footer-section footer-contact" variants={itemVariants}>
            <h4>Контакт</h4>
            <div className="contact-item">
              <FaPhone />
              <span>0898 754 518</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>Варна, България</span>
            </div>
            <div className="contact-item">
              <FaClock />
              <span>Пон-Пет: 10:00 - 19:00 Съб: 10:00 - 17:00</span>
            </div>
          </motion.div>

          <motion.div className="footer-section footer-services" variants={itemVariants}>
            <h4>Услуги</h4>
            <ul>
              <li>Маникюр & Педикюр</li>
              <li>Гел лак</li>
              <li>Nail Art</li>
              <li>Удължаване на нокти</li>
              <li>СПА процедури</li>
            </ul>
          </motion.div>

          <motion.div className="footer-section footer-newsletter" variants={itemVariants}>
            <h4>Новини</h4>
            <p>Абонирайте се за най-новите тенденции в nail art</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Вашият email" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Абониране
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div className="footer-bottom" variants={itemVariants}>
          <div className="footer-bottom-content">
            <p>© {new Date().getFullYear()} BettyNails. Всички права запазени.</p>
            <div className="footer-credits">
              <span>Създадено с <FaHeart className="heart-icon" /> от</span>
              <a href="https://websaitovete.eu">websaitovete.eu</a>

            </div>
          </div>
        </motion.div>
      </div>

      <div className="footer-decoration">
        <motion.div
          className="decoration-circle"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="decoration-circle decoration-circle-2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.footer>
  );
}

export default Footer;
