import { useState } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { Dish, CATEGORIES } from "../types";
import { MOCK_DISHES } from "../data/mockDishes";

export default function AdminPanel() {
  const [dishes, setDishes] = useState<Dish[]>(MOCK_DISHES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newDish, setNewDish] = useState<Partial<Dish>>({
    name: "",
    price: 0,
    category: CATEGORIES[0],
    description: "",
    isVeg: true,
    available: true
  });

  const handleSave = (id: string, updatedDish: Dish) => {
    setDishes(dishes.map(d => d.id === id ? updatedDish : d));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    // In a real app, we'd show a custom modal here
    setDishes(dishes.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-royal text-3xl text-charcoal">Admin Dashboard</h1>
          <button className="bg-gold text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md">
            <Plus size={18} /> ADD NEW DISH
          </button>
        </div>

        <div className="space-y-4">
          {dishes.map((dish) => (
            <div key={dish.id} className="glass-card p-4 rounded-xl flex items-center gap-4">
              <img src={dish.image} alt={dish.name} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
              <div className="flex-grow">
                <h3 className="font-bold text-charcoal">{dish.name}</h3>
                <p className="text-xs text-charcoal/60">{dish.category} • ₹{dish.price}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-charcoal/40 hover:text-gold transition-colors">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(dish.id)}
                  className="p-2 text-charcoal/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 glass-card rounded-2xl border-2 border-gold/10">
          <h2 className="font-royal text-xl text-gold mb-4">Restaurant Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-charcoal/40 uppercase">Restaurant Name</label>
              <input type="text" defaultValue="Morya's Royal Treat" className="w-full bg-white border border-gold/20 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-charcoal/40 uppercase">Contact Number</label>
              <input type="text" defaultValue="7991-68-7991" className="w-full bg-white border border-gold/20 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
