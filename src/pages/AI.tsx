
import React, { useState, useEffect } from 'react';
import { Shirt, Sparkles, RefreshCw, Backpack, Footprints, HardHat, ShoppingBag } from 'lucide-react';
import { toast } from "sonner";

const AI = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<Array<{id: number, name: string, items: string[], types: string[]}>>([]); 

  // Get appropriate icon for clothing type
  const getClothingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bags':
        return <Backpack className="w-8 h-8 text-muted-foreground" />;
      case 'shoes':
        return <Footprints className="w-8 h-8 text-muted-foreground" />;
      case 'hats':
        return <HardHat className="w-8 h-8 text-muted-foreground" />;
      case 'long sleeve':
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
      case 'short sleeve':
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
      case 'long pants':
        return <ShoppingBag className="w-8 h-8 text-muted-foreground" />;
      case 'short pants':
        return <ShoppingBag className="w-8 h-8 text-muted-foreground" />;
      case 'outerwear':
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
      default:
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
    }
  };

  // Mock AI generation
  const generateOutfits = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newOutfits = [
        {
          id: 1,
          name: "Casual Outfit",
          items: [
            "Black T-Shirt", 
            "Blue Jeans", 
            "White Sneakers", 
            "Brown Backpack", 
            "Gray Beanie"
          ],
          types: [
            "Short Sleeve",
            "Long Pants",
            "Shoes",
            "Bags",
            "Hats"
          ]
        },
        {
          id: 2,
          name: "Business Casual",
          items: [
            "White Dress Shirt", 
            "Navy Chinos", 
            "Brown Loafers", 
            "Leather Messenger Bag", 
            "Navy Blazer"
          ],
          types: [
            "Long Sleeve",
            "Long Pants",
            "Shoes",
            "Bags",
            "Outerwear"
          ]
        },
        {
          id: 3,
          name: "Summer Look",
          items: [
            "Striped T-Shirt", 
            "Khaki Shorts", 
            "Canvas Sneakers", 
            "Straw Hat", 
            "Canvas Tote Bag"
          ],
          types: [
            "Short Sleeve",
            "Short Pants",
            "Shoes",
            "Hats",
            "Bags"
          ]
        }
      ];
      
      setOutfits(newOutfits);
      setLoading(false);
      toast.success("AI suggestions generated!");
    }, 1500);
  };

  useEffect(() => {
    generateOutfits();
  }, []);

  return (
    <div className="wardrobe-container py-8 md:py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Outfit Suggestions</h1>
          <p className="text-muted-foreground">
            Get personalized outfit recommendations
          </p>
        </div>
        <button
          onClick={generateOutfits}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw size={18} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} /> Generate New Outfits
            </>
          )}
        </button>
      </div>

      {/* Generated outfits */}
      {loading ? (
        <div className="glass-card p-12 text-center">
          <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-wardrobe-blue" />
          <h3 className="text-lg font-medium mb-2">Generating outfit suggestions</h3>
          <p className="text-muted-foreground">
            Our AI is analyzing your wardrobe and preferences...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {outfits.map((outfit) => (
            <div key={outfit.id} className="glass-card p-5 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{outfit.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    AI Generated
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {outfit.items.map((item, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      {getClothingIcon(outfit.types[i])}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {outfit.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-wardrobe-blue"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full btn-outline mt-4 text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AI;
