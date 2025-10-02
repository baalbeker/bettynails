import { useState, useEffect } from "react";
import "./Gallery.css";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Heart, Eye, X, Grid, List } from "lucide-react";
import gal1 from "../assets/gallery/gal1.webp";
import gal2 from "../assets/gallery/gal2.webp";
import gal3 from "../assets/gallery/gal3.webp";
import gal4 from "../assets/gallery/gal4.webp";
import gal5 from "../assets/gallery/gal5.webp";
import gal6 from "../assets/gallery/gal6.webp";
import gal7 from "../assets/gallery/gal7.webp";
import gal8 from "../assets/gallery/gal8.webp";
import gal9 from "../assets/gallery/gal9.webp";
import gal10 from "../assets/gallery/gal10.webp";
import gal11 from "../assets/gallery/gal11.webp";
import gal12 from "../assets/gallery/gal12.webp";
import gal13 from "../assets/gallery/gal13.webp";
import gal14 from "../assets/gallery/gal14.webp";
import gal15 from "../assets/gallery/gal15.webp";
import gal16 from "../assets/gallery/gal16.webp";
import gal17 from "../assets/gallery/gal17.webp";
import gal18 from "../assets/gallery/gal18.webp";
import gal19 from "../assets/gallery/gal19.webp";
import gal20 from "../assets/gallery/gal20.webp";
import gal21 from "../assets/gallery/gal21.webp";
import gal22 from "../assets/gallery/gal22.webp";
import gal23 from "../assets/gallery/gal23.webp";
import gal24 from "../assets/gallery/gal24.webp";
import gal25 from "../assets/gallery/gal25.webp";
import gal26 from "../assets/gallery/gal26.webp";
import gal27 from "../assets/gallery/gal27.webp";
import gal28 from "../assets/gallery/gal28.webp";
import gal29 from "../assets/gallery/gal29.webp";
import gal30 from "../assets/gallery/gal30.webp";
import gal31 from "../assets/gallery/gal31.webp";
import gal32 from "../assets/gallery/gal32.webp";
import gal33 from "../assets/gallery/gal33.webp";
import gal34 from "../assets/gallery/gal34.webp";
import gal35 from "../assets/gallery/gal35.webp";
import gal36 from "../assets/gallery/gal36.webp";
import gal37 from "../assets/gallery/gal37.webp";
import gal38 from "../assets/gallery/gal38.webp";
import gal39 from "../assets/gallery/gal39.webp";
import gal40 from "../assets/gallery/gal40.webp";
import gal41 from "../assets/gallery/gal41.webp";
import gal42 from "../assets/gallery/gal42.webp";
import gal43 from "../assets/gallery/gal43.webp";
import gal44 from "../assets/gallery/gal44.webp";
import gal45 from "../assets/gallery/gal45.webp";
import gal46 from "../assets/gallery/gal46.webp";
import gal47 from "../assets/gallery/gal47.webp";
import gal48 from "../assets/gallery/gal48.webp";
import gal49 from "../assets/gallery/gal49.webp";


const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());

const allPhotos = [
  { id: 1, src: gal1, title: "Rose Bloom", category: "Nail Art", tags: ["floral", "pink", "elegant"], likes: 53, height: 300 },
  { id: 2, src: gal2, title: "Midnight Marble", category: "Gel Polish", tags: ["dark", "marble", "chic"], likes: 41, height: 260 },
  { id: 3, src: gal3, title: "Ocean Breeze", category: "Nail Art", tags: ["blue", "waves", "fresh"], likes: 37, height: 280 },
  { id: 4, src: gal4, title: "Golden Touch", category: "Gel Polish", tags: ["gold", "glam", "metallic"], likes: 60, height: 240 },
  { id: 5, src: gal5, title: "Lavender Dreams", category: "Nail Art", tags: ["purple", "soft", "dreamy"], likes: 44, height: 270 },
  { id: 6, src: gal6, title: "Cherry Pop", category: "Nail Art", tags: ["red", "vibrant", "classic"], likes: 36, height: 250 },
  { id: 7, src: gal7, title: "Crystal Sky", category: "Gel Polish", tags: ["sky blue", "minimal", "fresh"], likes: 58, height: 300 },
  { id: 8, src: gal8, title: "Pastel Paradise", category: "Nail Art", tags: ["pastel", "cute", "colorful"], likes: 34, height: 280 },
  { id: 9, src: gal9, title: "Matte Majesty", category: "Gel Polish", tags: ["matte", "bold", "fashion"], likes: 42, height: 290 },
  { id: 10, src: gal10, title: "Peachy Keen", category: "Nail Art", tags: ["peach", "summer", "soft"], likes: 46, height: 260 },
  { id: 11, src: gal11, title: "Glitter Storm", category: "Gel Polish", tags: ["glitter", "sparkle", "party"], likes: 51, height: 310 },
  { id: 12, src: gal12, title: "Nude Vibes", category: "Nail Art", tags: ["nude", "natural", "simple"], likes: 39, height: 250 },
  { id: 13, src: gal13, title: "Sunset Glow", category: "Gel Polish", tags: ["orange", "sunset", "warm"], likes: 47, height: 275 },
  { id: 14, src: gal14, title: "Star Dust", category: "Nail Art", tags: ["galaxy", "shimmer", "mystic"], likes: 55, height: 285 },
  { id: 15, src: gal15, title: "Mint Mood", category: "Gel Polish", tags: ["mint", "fresh", "cool"], likes: 32, height: 260 },
  { id: 16, src: gal16, title: "Velvet Rose", category: "Nail Art", tags: ["velvet", "rose", "luxury"], likes: 50, height: 270 },
  { id: 17, src: gal17, title: "Candy Swirl", category: "Nail Art", tags: ["candy", "fun", "colorful"], likes: 43, height: 280 },
  { id: 18, src: gal18, title: "Ice Queen", category: "Gel Polish", tags: ["white", "ice", "elegant"], likes: 36, height: 295 },
  { id: 19, src: gal19, title: "Smoky Plum", category: "Nail Art", tags: ["plum", "smoky", "dark"], likes: 31, height: 250 },
  { id: 20, src: gal20, title: "Sunshine Pop", category: "Gel Polish", tags: ["yellow", "bright", "cheerful"], likes: 49, height: 300 },
  { id: 21, src: gal21, title: "Rose Quartz", category: "Nail Art", tags: ["pink", "stone", "romantic"], likes: 56, height: 270 },
  { id: 22, src: gal22, title: "Sapphire Shine", category: "Gel Polish", tags: ["blue", "shimmer", "cool"], likes: 59, height: 310 },
  { id: 23, src: gal23, title: "Autumn Spice", category: "Nail Art", tags: ["brown", "fall", "cozy"], likes: 33, height: 260 },
  { id: 24, src: gal24, title: "Coral Crush", category: "Gel Polish", tags: ["coral", "bright", "tropical"], likes: 54, height: 265 },
  { id: 25, src: gal25, title: "Galaxy Glam", category: "Nail Art", tags: ["space", "stars", "purple"], likes: 38, height: 300 },
  { id: 26, src: gal26, title: "Champagne Chic", category: "Gel Polish", tags: ["beige", "shiny", "elegant"], likes: 47, height: 280 },
  { id: 27, src: gal27, title: "Neon Pop", category: "Nail Art", tags: ["neon", "party", "vivid"], likes: 45, height: 250 },
  { id: 28, src: gal28, title: "Graphite Edge", category: "Gel Polish", tags: ["grey", "urban", "sleek"], likes: 35, height: 290 },
  { id: 29, src: gal29, title: "Berry Bliss", category: "Nail Art", tags: ["berry", "deep", "vibrant"], likes: 52, height: 275 },
  { id: 30, src: gal30, title: "Opal Magic", category: "Gel Polish", tags: ["opal", "iridescent", "light"], likes: 57, height: 270 },
  { id: 31, src: gal31, title: "Cocoa Cream", category: "Nail Art", tags: ["brown", "sweet", "neutral"], likes: 42, height: 265 },
  { id: 32, src: gal32, title: "Lemon Drop", category: "Gel Polish", tags: ["lemon", "fun", "bright"], likes: 40, height: 250 },
  { id: 33, src: gal33, title: "Magenta Mist", category: "Nail Art", tags: ["magenta", "bold", "eye-catching"], likes: 46, height: 290 },
  { id: 34, src: gal34, title: "Cotton Candy", category: "Nail Art", tags: ["pink", "blue", "soft"], likes: 60, height: 280 },
  { id: 35, src: gal35, title: "Steel Shine", category: "Gel Polish", tags: ["metallic", "silver", "strong"], likes: 34, height: 275 },
  { id: 36, src: gal36, title: "Tropical Sunset", category: "Nail Art", tags: ["orange", "pink", "gradient"], likes: 48, height: 300 },
  { id: 37, src: gal37, title: "Peacock Feathers", category: "Gel Polish", tags: ["green", "blue", "exotic"], likes: 43, height: 285 },
  { id: 38, src: gal38, title: "Daisy Delight", category: "Nail Art", tags: ["flowers", "white", "yellow"], likes: 51, height: 270 },
  { id: 39, src: gal39, title: "Mystic Marble", category: "Gel Polish", tags: ["marble", "white", "gray"], likes: 37, height: 250 },
  { id: 40, src: gal40, title: "Ruby Romance", category: "Nail Art", tags: ["red", "passion", "shine"], likes: 44, height: 295 },
  { id: 41, src: gal41, title: "Frozen Bloom", category: "Gel Polish", tags: ["icy", "floral", "delicate"], likes: 39, height: 270 },
  { id: 42, src: gal42, title: "Denim Chic", category: "Nail Art", tags: ["denim", "casual", "blue"], likes: 36, height: 260 },
  { id: 43, src: gal43, title: "Pearl Glaze", category: "Gel Polish", tags: ["pearl", "shine", "neutral"], likes: 55, height: 285 },
  { id: 44, src: gal44, title: "Pink Mirage", category: "Nail Art", tags: ["pink", "illusion", "shine"], likes: 58, height: 275 },
  { id: 45, src: gal45, title: "Electric Sky", category: "Gel Polish", tags: ["electric blue", "pop", "vivid"], likes: 33, height: 300 },
  { id: 46, src: gal46, title: "Orchid Kiss", category: "Nail Art", tags: ["orchid", "feminine", "classy"], likes: 48, height: 270 },
  { id: 47, src: gal47, title: "Holographic Fade", category: "Gel Polish", tags: ["holo", "fade", "modern"], likes: 59, height: 295 },
  { id: 48, src: gal48, title: "Lilac Frost", category: "Nail Art", tags: ["lilac", "cool", "winter"], likes: 50, height: 260 },
  { id: 49, src: gal49, title: "Galaxy Drip", category: "Gel Polish", tags: ["galaxy", "drip", "fantasy"], likes: 38, height: 280 }
];

  const categories = ["All", ...new Set(allPhotos.map(photo => photo.category))];

  const filteredPhotos = allPhotos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedPhoto && e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhoto]);

  return (
    <div className="gallery-page-container">
      {/* Header Section */}
      <section className="gallery-header">
        <div className="container">
          <motion.div
            className="gallery-header-content text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Нашата Галерия</h1>
            <p>Разгледайте нашата богата колекция от дизайни за маникюр и вдъхновения от салона.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="gallery-filters">
        <div className="container">
          <div className="filters-container">
            <div className="search-container">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search designs, colors, styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filters">
              <Filter size={20} />
              <div className="category-buttons">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="container">
          <div className={`gallery-grid ${viewMode}`}>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="gallery-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => openModal(photo)}
              >
                <div className="gallery-image-container">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="gallery-image"
                    loading="lazy"
                    style={{ height: `${photo.height}px` }}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-actions">
                      <motion.button
                        className="gallery-action-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(photo);
                        }}
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        className={`gallery-action-btn ${favorites.has(photo.id) ? 'favorited' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(photo.id);
                        }}
                      >
                        <Heart size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="gallery-info">
                  <h3 className="gallery-title">{photo.title}</h3>
                  <div className="gallery-meta">
                    <span className="gallery-category">{photo.category}</span>
                    <span className="gallery-likes">
                      <Heart size={14} />
                      {photo.likes}
                    </span>
                  </div>
                  <div className="gallery-tags">
                    {photo.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3>No designs found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="gallery-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="gallery-modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="gallery-close-button" onClick={closeModal}>
                <X size={24} />
              </button>

              <div className="modal-image-container">
                <img 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.title}
                  className="modal-image"
                />
              </div>

              <div className="modal-info">
                <h3>{selectedPhoto.title}</h3>
                <div className="modal-meta">
                  <span className="modal-category">{selectedPhoto.category}</span>
                  <span className="modal-likes">
                    <Heart size={16} />
                    {selectedPhoto.likes} likes
                  </span>
                </div>
                <div className="modal-tags">
                  {selectedPhoto.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;