import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
    title: "Royal Treat",
    subtitle: "Rooftop Restaurant",
    tagline: "Experience Excellence"
  },
  {
    url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1920&q=80",
    title: "Exquisite Ambiance",
    subtitle: "Dine Under The Stars",
    tagline: "A View Like No Other"
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1920&q=80",
    title: "Culinary Mastery",
    subtitle: "Authentic Royal Flavors",
    tagline: "Crafted By Master Chefs"
  },
  {
    url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1920&q=80",
    title: "Evening Elegance",
    subtitle: "Perfect For Every Occasion",
    tagline: "Memories Made Royal"
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.2 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 }
      }
    })
  };

  return (
    <div className="relative w-full h-[450px] md:h-[650px] overflow-hidden border-b border-gold/20 bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={CAROUSEL_IMAGES[currentIndex].url}
            alt={CAROUSEL_IMAGES[currentIndex].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="font-royal text-5xl md:text-8xl text-gold mb-4 drop-shadow-2xl">
                {CAROUSEL_IMAGES[currentIndex].title}
              </h2>
              <p className="text-white text-[11px] md:text-base tracking-[0.8em] font-black uppercase opacity-90 drop-shadow-lg mb-12">
                {CAROUSEL_IMAGES[currentIndex].subtitle}
              </p>
              <div className="flex items-center justify-center gap-6 md:gap-12">
                <div className="h-[1px] w-12 md:w-24 bg-gold/60" />
                <span className="text-gold font-royal text-xl md:text-3xl italic tracking-widest">
                  {CAROUSEL_IMAGES[currentIndex].tagline}
                </span>
                <div className="h-[1px] w-12 md:w-24 bg-gold/60" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-gold transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/50 hover:text-gold transition-colors bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'w-8 bg-gold' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
