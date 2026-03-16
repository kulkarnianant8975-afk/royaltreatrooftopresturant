import React from 'react';
import { motion } from "motion/react";
import { Star, Flame, UtensilsCrossed, ArrowRight } from "lucide-react";
import { Dish } from "../types";

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      onClick={() => onClick(dish)}
      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10 border border-transparent hover:border-gold/20 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden">
        {/* Image with subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          {dish.isPopular && (
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-gold text-white text-[9px] tracking-widest font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl backdrop-blur-sm"
            >
              <Star size={10} fill="currentColor" className="text-white" /> POPULAR
            </motion.span>
          )}
          {dish.isChefSpecial && (
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-charcoal/90 text-gold text-[9px] tracking-widest font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl backdrop-blur-sm border border-gold/30"
            >
              <UtensilsCrossed size={10} /> CHEF'S SPECIAL
            </motion.span>
          )}
        </div>

        {/* Veg/Non-Veg Indicator */}
        <div className="absolute bottom-3 left-3 z-20">
          <div className={`w-6 h-6 flex items-center justify-center border-2 rounded-md bg-white/90 backdrop-blur-sm shadow-md ${dish.isVeg ? 'border-green-600' : 'border-red-600'}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'} shadow-sm`} />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-royal text-xl font-bold leading-tight text-charcoal group-hover:text-gold transition-colors duration-300">
            {dish.name}
          </h3>
        </div>
        
        <p className="text-sm text-charcoal/60 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {dish.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gold flex items-baseline">
              <span className="text-xs mr-0.5">₹</span>{dish.price}
            </span>
            {dish.isSpicy && (
              <span className="text-red-500 flex items-center gap-1 text-[11px] font-semibold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                <Flame size={12} /> Spicy
              </span>
            )}
          </div>
          
          {/* Subtle "Add" indicator or arrow */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ x: 0, opacity: 1 }}
            className="text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1 text-xs font-bold tracking-tighter"
          >
            DETAILS <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
