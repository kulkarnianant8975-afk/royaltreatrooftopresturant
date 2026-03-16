import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

const GALLERY_IMAGES = [
  {
    url: "images/hotel_image/hotel-indoor-photo.jpg",
    title: "Main Dining Area"
  },
  {
    url: "images/hotel_image/hotel-rooftop-photo.jpg",
    title: "Rooftop View"
  },
  {
    url: "images/hotel_image/hotel-indoor-photo.jpg",
    title: "Signature Royal Platter"
  },
  {
    url: "images/hotel_image/evening-view.webp",
    title: "Evening Atmosphere"
  },
  {
    url: "images/hotel_image/special-dish.jpg",
    title: "Chef's Special"
  },
  {
    url: "images/hotel_image/sitting-arrangement.jpg",
    title: "Fine Dining Setup"
  }
];

export default function PhotoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-gold font-bold text-[10px] tracking-[0.3em] uppercase mb-4">
            <Camera size={14} />
            Visual Journey
          </div>
          <h2 className="font-royal text-4xl text-charcoal">Photo Gallery</h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-6 md:px-[calc((100vw-1280px)/2+24px)] snap-x snap-mandatory"
      >
        {GALLERY_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="min-w-[300px] md:min-w-[500px] aspect-[4/3] relative rounded-3xl overflow-hidden snap-center group shadow-xl"
          >
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <h3 className="text-white font-royal text-2xl">{image.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
