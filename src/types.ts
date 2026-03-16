export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  isSpicy: boolean;
  isPopular: boolean;
  isChefSpecial: boolean;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export const CATEGORIES = [
  "Soups",
  "Crunchies",
  "Salad",
  "Raita",
  "Curd",
  "Munchies",
  "Noodle Bar",
  "Indo-Chinese Treats",
  "Royal Tandoor Se",
  "Marathwada Zaika",
  "Patiala",
  "Panjabi Dawaat",
  "Breads",
  "Rice",
  "Pulao",
  "Biryani",
  "Dal Khichadi",
  "Dal Handi",
  "Mocktails",
  "Desserts",
  "Cold Beverages",
  "Meal Combos"
];
