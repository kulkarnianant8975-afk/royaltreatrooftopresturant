import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Instagram, Phone, MapPin, ArrowUp, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Dish, CATEGORIES } from "../types";
import HotelLogo from "./HotelLogo";

interface NavbarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export default function Navbar({ onSearch, onFilterChange, activeFilter }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const scrollNavRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    CATEGORIES.forEach((cat) => {
      const id = cat.toLowerCase().replace(/\s+/g, '-');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Auto-scroll the category nav to keep active item in view
  useEffect(() => {
    if (activeCategory && scrollNavRef.current) {
      const activeElement = scrollNavRef.current.querySelector(`[data-id="${activeCategory}"]`);
      if (activeElement) {
        const container = scrollNavRef.current;
        const activeRect = (activeElement as HTMLElement).getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Only scroll if the element is not fully visible in the container
        const isVisible = (
          activeRect.left >= containerRect.left &&
          activeRect.right <= containerRect.right
        );

        if (!isVisible) {
          const scrollLeft = (activeElement as HTMLElement).offsetLeft - (container.offsetWidth / 2) + ((activeElement as HTMLElement).offsetWidth / 2);
          container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeCategory]);

  const scrollToCategory = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 180; // Adjusted for taller navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl py-0' : 'bg-white shadow-md py-4'}`}>
      {/* Top Bar - Hidden or minimized on scroll */}
      <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-16 opacity-100'}`}>
        <div className="flex flex-col flex-shrink-0">
          <h1 className="font-royal text-xl text-charcoal leading-none">MORYA'S</h1>
          <span className="text-[10px] tracking-[0.2em] text-gold font-bold">ROYAL TREAT</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink min-w-0">
          <button 
            onClick={() => navigate("/qr")}
            className="p-2 text-charcoal hover:text-gold transition-colors flex-shrink-0"
            title="View QR Code"
          >
            <QrCode size={20} />
          </button>
          
          <button 
            onClick={() => setShowSearch(!showSearch)}
             className="p-2 text-charcoal hover:text-gold transition-colors flex-shrink-0"
          >
            <Search size={20} />
          </button>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar flex-nowrap py-1 flex-shrink min-w-0">
            {['All', 'Veg', 'Spicy', 'Popular'].map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  activeFilter === f 
                    ? 'bg-gold text-white shadow-md' 
                    : 'bg-royal-cream text-charcoal/60 hover:bg-gold/10'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Classic Logo & Category Section */}
      <div className={`flex flex-col items-center transition-all duration-500 ${isScrolled ? 'pt-4' : 'pt-2'}`}>
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-2"
            >
              <HotelLogo size="sm" />
            </motion.div>
          )}
        </AnimatePresence>

        {!isScrolled && (
          <div className="w-full max-w-xs mx-auto mb-4 opacity-30">
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        )}

        {/* Sticky Category Nav */}
        <div 
          ref={scrollNavRef}
          className="w-full bg-white/50 backdrop-blur-sm border-b border-gold/10 overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="flex justify-center px-4 py-3 gap-8 whitespace-nowrap min-w-max mx-auto">
            {CATEGORIES.map((cat) => {
              const id = cat.toLowerCase().replace(/\s+/g, '-');
              const isActive = activeCategory === id;
              return (
                <a
                  key={cat}
                  href={`#${id}`}
                  data-id={id}
                  onClick={(e) => scrollToCategory(e, id)}
                  className={`text-[11px] font-bold tracking-[0.2em] transition-all uppercase relative py-1 ${
                    isActive ? 'text-gold' : 'text-charcoal/40 hover:text-gold/80'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white border-t border-gold/10 overflow-hidden"
          >
            <div className="px-4 py-3">
              <input
                type="text"
                placeholder="Search for your favorite royal dish..."
                className="w-full bg-royal-cream/50 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-gold outline-none"
                onChange={(e) => onSearch(e.target.value)}
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
