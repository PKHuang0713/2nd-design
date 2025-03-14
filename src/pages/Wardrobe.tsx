
import React, { useState } from 'react';
import { 
  Shirt, 
  Plus, 
  Search, 
  X, 
  Save, 
  Trash, 
  Filter,
  Sliders,
  Check,
  Backpack,
  Footprints,
  HardHat
} from 'lucide-react';
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const colorMap: Record<string, string> = {
  'black': '#000000',
  'white': '#FFFFFF',
  'red': '#E05D5D',
  'blue': '#5F78A7',
  'gray': '#808080',
  'grey': '#808080',
  'green': '#4CAF50',
  'yellow': '#FFEB3B',
  'purple': '#9C27B0',
  'pink': '#E91E63',
  'orange': '#FF9800',
  'brown': '#795548',
  'navy': '#000080',
  'teal': '#008080',
  'cyan': '#00BCD4',
  'magenta': '#FF00FF',
  'lime': '#CDDC39',
  'olive': '#808000',
  'maroon': '#800000',
  'beige': '#F5F5DC',
  'khaki': '#F0E68C',
  'silver': '#C0C0C0',
  'gold': '#FFD700',
  'tan': '#D2B48C',
};

const Wardrobe = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [clothingItems, setClothingItems] = useState([
    { id: 1, name: 'Black T-Shirt', type: 'Short Sleeve', color: 'Black', season: 'All' },
    { id: 2, name: 'Blue Jeans', type: 'Long Pants', color: 'Blue', season: 'All' },
    { id: 3, name: 'White Sneakers', type: 'Shoes', color: 'White', season: 'Spring/Summer' },
    { id: 4, name: 'Gray Hoodie', type: 'Outerwear', color: 'Gray', season: 'Fall/Winter' },
    { id: 5, name: 'Black Dress', type: 'Dress', color: 'Black', season: 'All' },
    { id: 6, name: 'Blue T-Shirt', type: 'Short Sleeve', color: 'Blue', season: 'Spring/Summer' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    type: '',
    color: '',
    season: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const getColorCode = (colorName: string): string => {
    const normalizedColor = colorName.toLowerCase();
    return colorMap[normalizedColor] || '#CCCCCC'; // Default to gray if color not found
  };

  const clothingCategories = [
    { id: 'long-sleeve', name: 'Long Sleeve', icon: <Shirt size={18} /> },
    { id: 'short-sleeve', name: 'Short Sleeve', icon: <Shirt size={18} /> },
    { id: 'long-pants', name: 'Long Pants', icon: <Shirt size={18} /> },
    { id: 'short-pants', name: 'Short Pants', icon: <Shirt size={18} /> },
    { id: 'outerwear', name: 'Outerwear', icon: <Shirt size={18} /> }, // Reverted back to original icon
    { id: 'bags', name: 'Bags', icon: <Backpack size={18} /> },
    { id: 'shoes', name: 'Shoes', icon: <Footprints size={18} /> },
    { id: 'hats', name: 'Hats', icon: <HardHat size={18} /> },
  ];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.type) {
      toast.error('Name and type are required');
      return;
    }

    const newId = clothingItems.length ? Math.max(...clothingItems.map(item => item.id)) + 1 : 1;
    
    setClothingItems([
      ...clothingItems,
      { id: newId, ...newItem }
    ]);
    
    setNewItem({ name: '', type: '', color: '', season: '' });
    setShowAddForm(false);
    toast.success('Item added successfully');
  };

  const handleDeleteItem = (id: number) => {
    setClothingItems(clothingItems.filter(item => item.id !== id));
    toast.success('Item removed successfully');
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const filteredItems = clothingItems.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(searchLower) ||
      item.type.toLowerCase().includes(searchLower) ||
      item.color.toLowerCase().includes(searchLower) ||
      item.season.toLowerCase().includes(searchLower);
    
    const matchesFilter = 
      selectedFilters.length === 0 || 
      selectedFilters.some(filter => 
        item.type.toLowerCase().includes(filter.toLowerCase().replace('-', ' '))
      );
    
    return matchesSearch && matchesFilter;
  });

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const handleTypeSelect = (value: string) => {
    setNewItem({ ...newItem, type: value });
  };

  return (
    <div className="wardrobe-container py-8 md:py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Wardrobe</h1>
          <p className="text-muted-foreground">
            Manage and organize your clothing items
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Add Item
          </button>
        </div>
      </div>

      <div className="glass-card p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="btn-outline flex items-center gap-2">
                <Filter size={18} /> Filters
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Items</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Sliders size={16} /> Categories
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {clothingCategories.map((category) => (
                    <div 
                      key={category.id}
                      className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer border ${
                        selectedFilters.includes(category.id) 
                          ? 'border-wardrobe-blue bg-wardrobe-lightBlue/20' 
                          : 'border-border'
                      }`}
                      onClick={() => toggleFilter(category.id)}
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span className="text-sm">{category.name}</span>
                      </div>
                      {selectedFilters.includes(category.id) && (
                        <Check size={16} className="text-wardrobe-blue ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button 
                  className="btn-outline"
                  onClick={() => setSelectedFilters([])}
                >
                  Clear All
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {}}
                >
                  Apply Filters
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showAddForm && (
        <div className="glass-card p-6 mb-8 animate-scale-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add New Item</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Clothing Type</label>
              <Select onValueChange={handleTypeSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select clothing type" />
                </SelectTrigger>
                <SelectContent>
                  {clothingCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input
                type="text"
                placeholder="Item Name"
                className="form-input"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <input
                type="text"
                placeholder="Color"
                className="form-input"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Season</label>
              <input
                type="text"
                placeholder="Season"
                className="form-input"
                value={newItem.season}
                onChange={(e) => setNewItem({ ...newItem, season: e.target.value })}
              />
            </div>
          </div>

          <div className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center mb-5">
            <Plus size={24} className="text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-sm">Add image</p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              className="btn-primary flex items-center gap-2"
            >
              <Save size={18} /> Save
            </button>
          </div>
        </div>
      )}

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="glass-card p-4 hover:shadow-lg transition-all duration-300 group">
              <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                <Shirt className="w-16 h-16 text-muted-foreground" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 rounded-full bg-wardrobe-red text-white hover:bg-red-600 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-medium truncate">{item.name}</h3>
              <div className="flex justify-between text-sm text-muted-foreground items-center">
                <span>{item.type}</span>
                <div className="flex items-center gap-1">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-200" 
                    style={{ backgroundColor: getColorCode(item.color) }}
                    title={item.color}
                  />
                  <span>{item.color}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <Shirt className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedFilters.length > 0
              ? "No items match your search criteria"
              : "You haven't added any clothing items yet"}
          </p>
          {!searchTerm && selectedFilters.length === 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus size={18} /> Add Your First Item
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Wardrobe;
