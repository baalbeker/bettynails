import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Heart, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './GallerySection.css';
import gal1 from "../assets/gallery/gal1.webp";
import gal2 from "../assets/gallery/gal2.webp";
import gal3 from "../assets/gallery/gal3.webp";
import gal4 from "../assets/gallery/gal4.webp";
import gal5 from "../assets/gallery/gal5.webp";
import gal6 from "../assets/gallery/gal6.webp";
import gal7 from "../assets/gallery/gal7.webp";
import gal8 from "../assets/gallery/gal8.webp";
import gal9 from "../assets/gallery/gal9.webp";

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const galleryImages = [
  { id: 1, src: gal1, title: "Rose Bloom", category: "Nail Art", tags: ["floral", "pink", "elegant"], likes: 53, height: 300 },
    { id: 2, src: gal2, title: "Midnight Marble", category: "Gel Polish", tags: ["dark", "marble", "chic"], likes: 41, height: 260 },
    { id: 3, src: gal3, title: "Ocean Breeze", category: "Nail Art", tags: ["blue", "waves", "fresh"], likes: 37, height: 280 },
    { id: 4, src: gal4, title: "Golden Touch", category: "Gel Polish", tags: ["gold", "glam", "metallic"], likes: 60, height: 240 },
    { id: 5, src: gal5, title: "Lavender Dreams", category: "Nail Art", tags: ["purple", "soft", "dreamy"], likes: 44, height: 270 },
    { id: 6, src: gal6, title: "Cherry Pop", category: "Nail Art", tags: ["red", "vibrant", "classic"], likes: 36, height: 250 },
    { id: 7, src: gal7, title: "Crystal Sky", category: "Gel Polish", tags: ["sky blue", "minimal", "fresh"], likes: 58, height: 300 },
    { id: 8, src: gal8, title: "Pastel Paradise", category: "Nail Art", tags: ["pastel", "cute", "colorful"], likes: 34, height: 280 },
    { id: 9, src: gal9, title: "Matte Majesty", category: "Gel Polish", tags: ["matte", "bold", "fashion"], likes: 42, height: 290 },
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }

    setSelectedImage(galleryImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <section className="gallery-section section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Нашата Галерия</h2>
<p>Открий нашите зашеметяващи арт дизайни за нокти и почерпи вдъхновение за своя следващ маникюр</p>
        </motion.div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onClick={() => openLightbox(image)}
            >
              <div className="gallery-image-container">
                <img
                  src={image.src}
                  alt={image.title}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-actions">
                    <motion.button
                      className="gallery-action-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(image);
                      }}
                    >
                      <Eye size={18} />
                    </motion.button>
                    <motion.button
                      className={`gallery-action-btn ${favorites.has(image.id) ? 'favorited' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(image.id);
                      }}
                    >
                      <Heart size={18} />
                    </motion.button>
                    <motion.button
                      className="gallery-action-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Share functionality can be implemented here
                      }}
                    >
                      <Share2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="gallery-info">
                <h3 className="gallery-title">{image.title}</h3>
                <div className="gallery-meta">
                  <span className="gallery-category">{image.category}</span>
                  <span className="gallery-likes">
                    <Heart size={14} />
                    {image.likes}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="gallery-cta text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>Искате да видите повече от нашето изкуство?</p>
          <Link to="/gallery">
            <motion.button
              className="btn btn-primary btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Отвори Галерия
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <X size={24} />
              </button>

              <button
                className="lightbox-nav lightbox-prev"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="lightbox-nav lightbox-next"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight size={24} />
              </button>

              <div className="lightbox-image-container">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="lightbox-image"
                />
              </div>

              <div className="lightbox-info">
                <h3>{selectedImage.title}</h3>
                <div className="lightbox-meta">
                  <span className="lightbox-category">{selectedImage.category}</span>
                  <span className="lightbox-likes">
                    <Heart size={16} />
                    {selectedImage.likes} likes
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GallerySection;
