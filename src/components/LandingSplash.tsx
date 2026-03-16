import { motion } from "motion/react";
import HotelLogo from "./HotelLogo";

interface LandingSplashProps {
  onEnter: () => void;
}

export default function LandingSplash({ onEnter }: LandingSplashProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory overflow-hidden">
      {/* Background Texture/Ambience */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src="https://picsum.photos/seed/restaurant/1920/1080?blur=10" 
          alt="ambience" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center px-6 flex flex-col items-center w-full max-w-4xl"
      >
        {/* Ornamental Header */}
        <div className="mb-10 w-full">
           <HotelLogo size="lg" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-gold tracking-[0.5em] text-[11px] font-black mb-8 uppercase opacity-80">
            Experience Excellence
          </h2>
          
          <p className="font-royal text-2xl text-charcoal/80 mb-14 italic tracking-wider max-w-md mx-auto leading-relaxed">
            "Gratitude Served With Every Meal.
                We Loved Having You Here"
          </p>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#3B3B3B", color: "#FFFFFF" }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="bg-transparent border-2 border-charcoal text-charcoal px-14 py-5 rounded-full font-bold tracking-[0.3em] text-[10px] shadow-xl transition-all uppercase hover:shadow-2xl"
          >
            Explore Menu
          </motion.button>
        </motion.div>

        {/* Ornamental Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20"
        >
           <svg className="w-64 h-8 mx-auto text-gold" viewBox="0 0 100 30">
             <path d="M0,15 Q25,25 50,15 T100,15" fill="none" stroke="currentColor" strokeWidth="0.5" />
           </svg>
        </motion.div>
      </motion.div>

      {/* Corner Ornaments */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-3xl" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-3xl" />
    </div>
  );
}
