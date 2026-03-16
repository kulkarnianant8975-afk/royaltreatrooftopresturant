import React from 'react';
import { Dish } from "../types";
import DishCard from "./DishCard";

interface CategorySectionProps {
  category: string;
  dishes: Dish[];
  onDishClick: (dish: Dish) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, dishes, onDishClick }) => {
  if (dishes.length === 0) return null;

  return (
    <section id={category.toLowerCase().replace(/\s+/g, '-')} className="py-8 px-4 scroll-mt-48 md:scroll-mt-56">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-grow bg-gold/30" />
        <h2 className="font-royal text-2xl text-gold whitespace-nowrap px-2">
          {category}
        </h2>
        <div className="h-px flex-grow bg-gold/30" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} onClick={onDishClick} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
