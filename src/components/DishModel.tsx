import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Flame, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { Dish } from "../types";

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
}

export default function DishModal({ dish, onClose }: DishModalProps) {
  if (!dish) return null;

  return (
    <AnimatePresence>
      {dish && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-ivory rounded-[2.5rem] overflow-hidden shadow-2xl border border-gold/20"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full text-charcoal hover:text-gold transition-colors shadow-lg"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent md:hidden" />
                
                {/* Badges on Image (Mobile) */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-2 md:hidden">
                  {dish.isPopular && (
                    <span className="bg-gold text-white text-[8px] tracking-widest font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star size={8} fill="currentColor" /> POPULAR
                    </span>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 flex items-center justify-center border-2 rounded-md bg-white ${dish.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                    </div>
                    <span className="text-[10px] tracking-[0.2em] text-gold font-bold uppercase">{dish.category}</span>
                  </div>
                  
                  <h2 className="font-royal text-3xl md:text-4xl text-charcoal leading-tight mb-2">
                    {dish.name}
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-gold">
                      <span className="text-sm mr-1">₹</span>{dish.price}
                    </span>
                    {dish.isSpicy && (
                      <span className="text-red-500 flex items-center gap-1 text-xs font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-100">
                        <Flame size={14} /> Spicy
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest mb-2">Description</h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed mb-8">
                    {dish.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {dish.isPopular && (
                      <div className="flex items-center gap-2 text-[11px] font-medium text-charcoal/60 bg-royal-cream px-3 py-1.5 rounded-lg border border-gold/10">
                        <Star size={12} className="text-gold" fill="currentColor" />
                        Customer Favorite
                      </div>
                    )}
                    {dish.isChefSpecial && (
                      <div className="flex items-center gap-2 text-[11px] font-medium text-charcoal/60 bg-royal-cream px-3 py-1.5 rounded-lg border border-gold/10">
                        <UtensilsCrossed size={12} className="text-gold" />
                        Chef's Recommendation
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full bg-charcoal text-white py-4 rounded-2xl font-bold text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-charcoal/90 transition-all group"
                >
                  <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                  BACK TO MENU
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
