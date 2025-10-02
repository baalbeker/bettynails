import './About.css';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Award,
  Star,
  Sparkles,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Trophy,
  Calendar
} from 'lucide-react';
import beti from "../assets/beti.jpg"
import before1 from '../assets/beforeafter/before1.jfif'
import after1 from '../assets/beforeafter/after1.jfif'

import before2 from '../assets/beforeafter/before2.jfif'
import after2 from '../assets/beforeafter/after2.jfif'

import before3 from '../assets/beforeafter/before3.jfif'
import after3 from '../assets/beforeafter/after3.jfif'



function About() {
  const team = [
    {
      name: "Бетина Борилова",
      role: "Маникюрист",
      email: "betinaborilova3@gmail.com",
      phone: "+359898754518",
      photo: beti,
      experience: "3+ години",
      specialties: ["Nail Art", "Гел удължаване", "Френски маникюр"]
    },
    // {
    //   name: "София Петрова",
    //   role: "Старши специалист",
    //   email: "sofia@bellanails.com",
    //   phone: "+359 87 654 3210",
    //   photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    //   experience: "4+ години",
    //   specialties: ["Педикюр", "Spa процедури", "Кристални декорации"]
    // },
    // {
    //   name: "Ема Димитрова",
    //   role: "Nail Art специалист",
    //   email: "emma@bellanails.com",
    //   phone: "+359 89 112 2334",
    //   photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    //   experience: "3+ години",
    //   specialties: ["Художествени дизайни", "Омбре ефекти", "Pigment effects"]
    // }
  ];

  const achievements = [
    // {
    //   icon: Trophy,
    //   title: "Най-добър салон 2023",
    //   description: "Първо място в конкурса 'Салон на годината' във Варна"
    // },
    {
      icon: Star,
      title: "100+ доволни клиенти",
      description: "Повече от 100 клиенти ни избраха за техните нокти"
    },
    {
      icon: Trophy,
      title: "Сертифицирана специалност",
      description: "Постоянно усъвършенствам уменията си чрез обучения, за да Ви предоставя най-висококачествени услуги."
    },
    //     {
    //   icon: Trophy,
    //   title: "Сертифицирани специалисти",
    //   description: "Всички наши специалисти са с международни сертификати"
    // },
    {
      icon: Award,
      title: "Качествена гаранция",
      description: "7-дневна гаранция на всички наши услуги"
    }
  ];

  const beforeAfterGallery = [
    {
      before: before1,
      after: after1,
      description: "3D цвете"
    },
    {
      before: before2,
      after: after2,
      description: "Класически червен маникюр"
    },
    {
      before: before3,
      after: after3,
      description: "Укрепване с гел - форма квадрат"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero-content text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="about-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heart size={16} />
              <span>За нас</span>
            </motion.div>

            <h1>Нашата история</h1>
            <p className="about-description">
              BettyNails е създаден с мисията да предложи най-доброто в света на nail art-а. 
              Вече повече от 3 години създаваме красота и предлагаме професионални услуги във Варна.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section">
        <div className="container">
          <div className="story-content">
            <motion.div
              className="story-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Нашата мисия</h2>
              <p>
                В BettyNails вярваме, че красивите нокти са не просто аксесоар, 
                а начин да изразите своята индивидуалност. Нашата мисия е да създадем 
                уникални дизайни, които отразяват вашия стил и ви правят да се чувствате уверени.
              </p>
              <div className="story-values">
                <div className="value-item">
                  <CheckCircle size={20} />
                  <span>Индивидуален подход към всеки клиент</span>
                </div>
                <div className="value-item">
                  <CheckCircle size={20} />
                  <span>Използване на най-качествени продукти</span>
                </div>
                <div className="value-item">
                  <CheckCircle size={20} />
                  <span>Постоянно обучение и следване на трендовете</span>
                </div>
                <div className="value-item">
                  <CheckCircle size={20} />
                  <span>Приятна и релаксираща атмосфера</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=400&fit=crop" 
                alt="BettyNails салон"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Нашият екип</h2>
            <p>Запознайте се с професионалистите, които ще се грижат за вашите нокти</p>
          </motion.div>

          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="team-member-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="member-photo">
                  <img src={member.photo} alt={member.name} />
                </div>
                
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-experience">
                    <Clock size={16} />
                    <span>{member.experience}</span>
                  </p>
                  
                  <div className="member-specialties">
                    <h4>Специалности:</h4>
                    <ul>
                      {member.specialties.map((specialty, i) => (
                        <li key={i}>
                          <Sparkles size={12} />
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="member-contact">
                    <a href={`mailto:${member.email}`} className="contact-link">
                      <Mail size={16} />
                      <span>Имейл</span>
                    </a>
                    <a href={`tel:${member.phone}`} className="contact-link">
                      <Phone size={16} />
                      <span>Телефон</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Нашите постижения</h2>
            <p>Гордеем се с признанието и доверието на нашите клиенти</p>
          </motion.div>

          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="achievement-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="achievement-icon">
                  <achievement.icon size={32} />
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="before-after-section section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Преди и след</h2>
            <p>Вижте трансформацията, която можем да направим</p>
          </motion.div>

          <div className="before-after-grid">
            {beforeAfterGallery.map((item, index) => (
              <motion.div
                key={index}
                className="before-after-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="comparison">
                  <div className="before">
                    <img src={item.before} alt="Преди" />
                    <span className="label">Преди</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="after">
                    <img src={item.after} alt="След" />
                    <span className="label">След</span>
                  </div>
                </div>
                <p className="description">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section">
        <div className="container">
          <motion.div
            className="cta-content text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Готови да станете част от нашето семейство?</h2>
            <p>Запазете час днес и се убедете защо толкова много хора ни избират</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">
                <Calendar size={20} />
                <span>Запази час</span>
              </button>
              <button className="btn btn-secondary btn-lg">
                <Phone size={20} />
                <span>Свържи се с нас</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;
