import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, Instagram, Phone, MapPin, QrCode } from "lucide-react";
import LandingSplash from "./components/LandingSplash";
import Navbar from "./components/Navbar";
import CategorySection from "./components/CategorySection";
import QRView from "./components/QRView";
import AdminPanel from "./components/AdminPanel";
import DishModal from "./components/DishModel";
import { MOCK_DISHES } from "./data/mockDishes";
import { CATEGORIES, Dish } from "./types";

function MenuView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const navigate = useNavigate();

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredDishes = useMemo(() => {
    return MOCK_DISHES.filter((dish) => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === "All" || 
                          (filter === "Veg" && dish.isVeg) ||
                          (filter === "Spicy" && dish.isSpicy) ||
                          (filter === "Popular" && dish.isPopular);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filter]);

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section - Now at the very top */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-[450px] md:h-[650px] relative overflow-hidden border-b border-gold/20"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80" 
            alt="Royal Treat Rooftop Restaurant" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="font-royal text-5xl md:text-8xl text-gold mb-4 drop-shadow-2xl">
              Royal Treat
            </h1>
            <p className="text-white text-[11px] md:text-base tracking-[0.8em] font-black uppercase opacity-90 drop-shadow-lg mb-12">
              Rooftop Restaurant
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              <div className="h-[1px] w-12 md:w-24 bg-gold/60" />
              <span className="text-gold font-royal text-xl md:text-3xl italic tracking-widest">Experience Excellence</span>
              <div className="h-[1px] w-12 md:w-24 bg-gold/60" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Navbar 
        onSearch={setSearchQuery} 
        onFilterChange={setFilter} 
        activeFilter={filter} 
      />
      
      <main className="max-w-7xl mx-auto pt-12">
        {CATEGORIES.map((cat) => (
          <CategorySection 
            key={cat}
            category={cat} 
            dishes={filteredDishes.filter(d => d.category === cat)} 
            onDishClick={setSelectedDish}
          />
        ))}

        {filteredDishes.length === 0 && (
          <div className="text-center py-20 px-6">
            <p className="text-charcoal/40 italic">No royal dishes found matching your search...</p>
          </div>
        )}
      </main>

      <DishModal 
        dish={selectedDish} 
        onClose={() => setSelectedDish(null)} 
      />

      {/* Footer Info */}
      <footer className="bg-charcoal text-white py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-royal text-2xl text-gold mb-2">MORYA'S ROYAL TREAT</h2>
          <p className="text-[10px] tracking-[0.3em] mb-8 opacity-60 uppercase">Rooftop Restaurant</p>
          
          <div className="flex flex-col gap-6 items-center mb-10 text-sm">
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://www.instagram.com/moryasroyaltreatrooftop?igsh=MnBob2YwbjFzajU2" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-white/90 hover:scale-105 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#E4405F] text-white shadow-lg shadow-[#E4405F]/20">
                  <Instagram size={20} />
                </div>
                <span className="hidden md:inline font-bold">Instagram</span>
              </a>

              <a 
                href="https://www.facebook.com/share/18QdPPBXvV/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-white/90 hover:scale-105 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </div>
                <span className="hidden md:inline font-bold">Facebook</span>
              </a>

              <a 
                href="https://wa.me/917991687991" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-white/90 hover:scale-105 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.801.982 3.826 1.499 5.884 1.5h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <span className="hidden md:inline font-bold">WhatsApp</span>
              </a>

              <a 
                href="https://www.google.com/maps/place/Morya's+Royal+Treat+Rooftop+Restaurant/@19.2539715,76.7917922,17z/data=!4m8!3m7!1s0x3bd0190e85fc3423:0x45bfef310054d73f!8m2!3d19.2539715!4d76.7917922!9m1!1b1!16s%2Fg%2F11mcwhwkk1?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-white/90 hover:scale-105 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-[#4285F4] text-white shadow-lg shadow-[#4285F4]/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.908 4.152-1.24 1.24-3.14 2.56-6.54 2.56-5.41 0-9.8-4.39-9.8-9.8s4.39-9.8 9.8-9.8c2.93 0 5.14 1.16 6.87 2.8l2.31-2.31C18.77 1.64 15.93 0 12.48 0 6.48 0 1.6 4.88 1.6 10.88s4.88 10.88 10.88 10.88c3.24 0 5.69-1.06 7.69-3.14 2.07-2.07 2.73-4.98 2.73-7.39 0-.69-.05-1.34-.16-1.92H12.48z"/></svg>
                </div>
                <span className="hidden md:inline font-bold">Google Review</span>
              </a>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center mt-4">
              <a href="tel:7991687991" className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors">
                <Phone size={16} /> +91 7991-68-7991
              </a>
              <button 
                onClick={() => navigate("/qr")}
                className="flex items-center gap-2 text-white/60 hover:text-gold transition-colors"
              >
                <QrCode size={16} /> Digital Menu QR Code
              </button>
            </div>
          </div>

          <div className="gold-divider opacity-20 mb-6" />
          <p className="text-[10px] opacity-40">© 2026 Morya's Royal Treat. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 bg-gold text-white p-4 rounded-full shadow-2xl hover:bg-gold/90 transition-all"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function MainContent() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <LandingSplash onEnter={() => setShowSplash(false)} />;
  }

  return <MenuView />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/qr" element={<QRView />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
