import "./Services.css";
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Star,
  Clock,
  CheckCircle,
  Scissors,
  Palette,
  Gem,
  Crown,
  Zap
} from 'lucide-react';

function Services() {
  const serviceCategories = [
    {
      id: 'manicure',
      title: 'Маникюр услуги',
      icon: Sparkles,
      color: 'primary',
      services: [
        {
          name: 'Маникюр с гел лак',
          price: '45 лв',
          duration: '90 мин',
          description: 'Пълна грижа за ноктите с гел лак, третиране на кожичките и масаж на ръцете',
          features: ['Грижа за кожички', 'Оформяне на ноктите', 'Гел лак', '7-дневна гаранция']
        },
        {
          name: 'Гел върху естествен нокът',
          price: '55-75 лв',
          duration: '120 мин',
          description: 'Укрепване на естествения нокът с висококачествен гел за по-здрава структура, дълготрайност и перфектен външен вид.',
          features: ['Укрепващо третиране', 'Грижа за кожички', 'Гел лак', '7-дневна гаранция']
        },
        {
          name: 'Изграждане',
          price: 'от 80 лв',
          duration: '180 мин',
          description: 'Удължаване на естественият нокът с гел и/или гелови типси',
          features: ['Гел укрепяване', 'Третиране на кожички', 'Премиум лак', '7-дневна гаранция']
        },
        {
          name: 'Класически маникюр (без лак)',
          price: '25 лв',
          duration: '45 мин',
          description: 'Традиционна грижа за ноктите без нанасяне на лак',
          features: ['Грижа за кожички', 'Оформяне на ноктите', 'Масаж на ръцете', 'Полиране на ноктите']
        }
      ]
    },
    {
      id: 'pedicure',
      title: 'Педикюр',
      icon: Heart,
      color: 'secondary',
      services: [
        {
          name: 'Педикюр с гел лак',
          price: '55 лв',
          duration: '90 min',
description: 'Луксозна грижа за краката с гел лак и релаксиращи процедури',
features: ['Топла вана за крака', 'Грижа за кожичките', 'Премахване на мъртва кожа', 'Масаж на стъпалата', 'Гел лак']

        },
        {
          name: 'Класически педикюр',
          price: '45 лв',
          duration: '90 min',
          description: '„Поглези се с педикюр, включващ топла вана, деликатно почистване на кутикулите, премахване на мъртва кожа и отпускащ масаж на краката.“',
          features: ['Топла вана за крака', 'Премахване на мъртва кожа', 'Масаж на стъпалата', "Почистване на кутикули"]
        },
                {
          name: 'СПА педикюр',
          price: '65 лв',
          duration: '90 min',
          description: '„Поглези се с педикюр, включващ топла вана, деликатно почистване на кутикулите, премахване на мъртва кожа и отпускащ масаж на краката.“',
          features: ['Топла вана за крака', 'Премахване на загрубяла кожа', 'Ексфолиращ пилинг', 'Масаж на стъпалата', "Почистване на кутикули"]
        }
      ]
    },
    // {
    //   id: 'extensions',
    //   title: 'Nail Extensions',
    //   icon: Crown,
    //   color: 'accent',
    //   services: [
    //     {
    //       name: 'Gel Extension (Short)',
    //       price: '$85',
    //       duration: '120 min',
    //       description: 'Professional nail extensions up to 1.5cm length',
    //       features: ['Custom length', 'Shape design', 'Gel polish', '7-day warranty']
    //     },
    //     {
    //       name: 'Gel Extension (Medium)',
    //       price: '$90',
    //       duration: '130 min',
    //       description: 'Beautiful extensions up to 2.5cm length',
    //       features: ['Custom length', 'Shape design', 'Gel polish', '7-day warranty']
    //     },
    //     {
    //       name: 'Gel Extension (Long)',
    //       price: '$95',
    //       duration: '140 min',
    //       description: 'Stunning long extensions up to 3cm',
    //       features: ['Custom length', 'Shape design', 'Gel polish', '7-day warranty']
    //     },
    //     {
    //       name: 'Extra Long Extensions',
    //       price: '$105',
    //       duration: '150 min',
    //       description: 'Dramatic extensions over 3cm length',
    //       features: ['Custom length', 'Premium materials', 'Gel polish', '7-day warranty']
    //     }
    //   ]
    // },
    // {
    //   id: 'maintenance',
    //   title: 'Maintenance & Removal',
    //   icon: Scissors,
    //   color: 'neutral',
    //   services: [
    //     {
    //       name: 'Extension Maintenance (Short)',
    //       price: '$65',
    //       duration: '90 min',
    //       description: 'Professional maintenance for short extensions',
    //       features: ['Refill service', 'Cuticle care', 'Shape correction', '7-day warranty']
    //     },
    //     {
    //       name: 'Extension Maintenance (Medium)',
    //       price: '$70',
    //       duration: '100 min',
    //       description: 'Complete maintenance for medium length extensions',
    //       features: ['Refill service', 'Cuticle care', 'Shape correction', '7-day warranty']
    //     },
    //     {
    //       name: 'Extension Maintenance (Long)',
    //       price: '$75',
    //       duration: '110 min',
    //       description: 'Professional care for long extensions',
    //       features: ['Refill service', 'Cuticle care', 'Shape correction', '7-day warranty']
    //     },
    //     {
    //       name: 'Gel Polish Removal',
    //       price: '$15',
    //       duration: '20 min',
    //       description: 'Safe gel polish removal',
    //       features: ['Professional removal', 'Nail conditioning']
    //     },
    //     {
    //       name: 'Extension Removal + Care',
    //       price: '$35',
    //       duration: '60 min',
    //       description: 'Complete extension removal with nail care',
    //       features: ['Safe removal', 'Cuticle care', 'Nail conditioning', 'Hand massage']
    //     }
    //   ]
    // },
    {
      id: 'art',
      title: 'Декорации',
      icon: Palette,
      color: 'gradient',
      services: [
        {
          name: 'Френски маникюр / Омбре',
          price: '10лв',
          duration: '+20 min',
          description: 'Френски маникюр или омбре ефект',
          features: ['Професионална техника']
        },
        {
          name: 'Ръчно рисувани декорации',
          price: '+3-10лв. на нокът',
          duration: '+15 мин на нокът',
          description: 'Ръчно рисувани дизайни',
          features: ['Различни дизайни', 'Артистичен детайл']
        },
        {
          name: 'Кристални камъни',
          price: '+3лв. на нокът',
          duration: '+10 мин на нокът',
          description: 'Декорация с блестящи камъни',
          features: ['Блестящи камъни', 'Прецизно поставяне']
        },
        {
          name: 'Фолио дизайн',
          price: '+1лв. на нокът',
          duration: '+3 мин на нокът',
          description: 'Различни цветове и видове фолиа',
          features: ['Разнообразие от дизайни']
        },
        {
          name: 'Огледален ефект',
          price: '+5лв.',
          duration: '+10 мин',
          description: 'Специален пигмент с огледален ефект',
          features: ['Огледален ефект', 'Русалка', 'Различни цветове']
        }
      ]
    }
  ];

  const policies = [
    {
      icon: CheckCircle,
      title: 'Гаранция за качество',
      description: '7-дневна гаранция на всички услуги с безплатни докосвания'
    },
    {
      icon: Clock,
      title: 'Точност',
      description: 'Моля, пристигайте навреме. Закъснения могат да наложат пренасрочване'
    },
    {
      icon: Zap,
      title: 'Външна работа',
      description: 'Премахването на работа, направена другаде, се таксува еднократно с 15 лв'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'border-primary-200 bg-primary-50',
      secondary: 'border-rose-200 bg-rose-50',
      accent: 'border-emerald-200 bg-emerald-50',
      neutral: 'border-neutral-200 bg-neutral-50',
      gradient: 'border-purple-200 bg-purple-50'
    };
    return colors[color] || colors.primary;
  };

  const getIconColor = (color) => {
    const colors = {
      primary: 'text-primary-600',
      secondary: 'text-rose-600',
      accent: 'text-emerald-600',
      neutral: 'text-neutral-600',
      gradient: 'text-purple-600'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <motion.div
            className="services-hero-content text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="services-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles size={16} />
              <span>Premium Services</span>
            </motion.div>

            <h1>Нашите услуги за нокти</h1>
            <p className="services-description">
              Открийте нашата цялостна гама от професионални услуги за грижа за ноктите,
              от класически маникюр до зашеметяващи nail art творения.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-content section">
        <div className="container">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              className="service-category"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="category-header">
                <div className={`category-icon ${getIconColor(category.color)}`}>
                  <category.icon size={32} />
                </div>
                <h2>{category.title}</h2>
              </div>

              <div className="services-grid">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={service.name}
                    className={`service-card ${getColorClasses(category.color)}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="service-header">
                      <h3>{service.name}</h3>
                      <div className="service-meta">
                        <span className="service-price">{service.price}</span>
                        {service.duration && (
                          <span className="service-duration">
                            <Clock size={14} />
                            {service.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="service-description">{service.description}</p>

                    <div className="service-features">
                      {service.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <CheckCircle size={14} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      className="btn btn-primary btn-sm service-booking-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles size={16} />
                      <span>Запази час</span>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Policies Section */}
      <section className="policies-section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Политики за услугите</h2>
            <p>Важна информация относно нашите услуги</p>
          </motion.div>

          <div className="policies-grid">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                className="policy-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="policy-icon">
                  <policy.icon size={24} />
                </div>
                <h3>{policy.title}</h3>
                <p>{policy.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            className="cta-content text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Готови да запазите час?</h2>
            <p>
              Изберете от нашите премиум услуги за нокти и се насладете
              на лукса на професионалната грижа за ноктите.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg">
                <Sparkles size={20} />
                <span>Запази сега</span>
              </button>
              <button className="btn btn-secondary btn-lg">
                <span>Обади се</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Services;
