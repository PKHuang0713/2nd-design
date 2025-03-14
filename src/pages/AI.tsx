
import React, { useState, useEffect } from 'react';
import { Shirt, Sparkles, RefreshCw, Backpack, Footprints, HardHat, Heart } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const AI = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<Array<{id: number, name: string, items: string[], types: string[], saved: boolean}>>([]); 
  const [selectedOutfit, setSelectedOutfit] = useState<{id: number, name: string, items: string[], types: string[]} | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

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
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
      case 'short pants':
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
      case 'outerwear':
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
      default:
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
    }
  };

  // Generate a random number between min and max (inclusive)
  const getRandomItemCount = () => {
    return Math.floor(Math.random() * 4) + 3; // Random number between 3-6
  };

  // Mock AI generation
  const generateOutfits = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Clothing items and types pools to randomly select from
      const clothingItems = {
        "Short Sleeve": ["Black T-Shirt", "Striped T-Shirt", "Graphic Tee", "Polo Shirt", "Printed T-Shirt"],
        "Long Sleeve": ["White Dress Shirt", "Flannel Shirt", "Henley", "Oxford Shirt", "Turtleneck"],
        "Long Pants": ["Blue Jeans", "Navy Chinos", "Black Trousers", "Khaki Pants", "Corduroy Pants"],
        "Short Pants": ["Khaki Shorts", "Denim Shorts", "Swim Trunks", "Athletic Shorts", "Cargo Shorts"],
        "Shoes": ["White Sneakers", "Brown Loafers", "Canvas Sneakers", "Leather Boots", "Sandals"],
        "Bags": ["Brown Backpack", "Leather Messenger Bag", "Canvas Tote Bag", "Gym Bag", "Laptop Bag"],
        "Hats": ["Gray Beanie", "Straw Hat", "Baseball Cap", "Fedora", "Sun Hat"],
        "Outerwear": ["Navy Blazer", "Denim Jacket", "Leather Jacket", "Windbreaker", "Puffer Coat"]
      };
      
      // Outfit themes
      const outfitThemes = [
        "Casual Outfit", 
        "Business Casual",
        "Summer Look",
        "Urban Style",
        "Outdoor Adventure",
        "Weekend Getaway"
      ];
      
      // Generate 3 random outfits
      const newOutfits = Array(3).fill(0).map((_, index) => {
        // Get random number of items (3-6)
        const itemCount = getRandomItemCount();
        
        // Select unique clothing types for this outfit
        const allTypes = Object.keys(clothingItems);
        const shuffledTypes = [...allTypes].sort(() => 0.5 - Math.random());
        const selectedTypes = shuffledTypes.slice(0, itemCount);
        
        // Select random items for each chosen type
        const selectedItems = selectedTypes.map(type => {
          const itemsOfType = clothingItems[type as keyof typeof clothingItems];
          return itemsOfType[Math.floor(Math.random() * itemsOfType.length)];
        });
        
        // Select random outfit name
        const outfitName = outfitThemes[Math.floor(Math.random() * outfitThemes.length)];
        
        return {
          id: index + 1,
          name: outfitName,
          items: selectedItems,
          types: selectedTypes,
          saved: false
        };
      });
      
      setOutfits(newOutfits);
      setLoading(false);
      toast.success("AI suggestions generated!");
    }, 1500);
  };

  // Handle saving an outfit
  const handleSaveOutfit = (outfit: {id: number, name: string, items: string[], types: string[]}) => {
    setSelectedOutfit(outfit);
    setShowSaveDialog(true);
  };

  // Confirm saving an outfit
  const confirmSaveOutfit = () => {
    if (!selectedOutfit) return;
    
    // Update the outfits list to mark this outfit as saved
    setOutfits(prevOutfits => 
      prevOutfits.map(outfit => 
        outfit.id === selectedOutfit.id 
        ? {...outfit, saved: true} 
        : outfit
      )
    );
    
    // Close the dialog
    setShowSaveDialog(false);
    
    // Show success message
    toast.success("Outfit saved to your collection!");
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
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      AI Generated
                    </span>
                    <button 
                      onClick={() => handleSaveOutfit(outfit)}
                      className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-muted transition-colors"
                      aria-label="Save outfit"
                    >
                      <Heart 
                        className={`w-5 h-5 ${outfit.saved ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} 
                      />
                    </button>
                  </div>
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

      {/* Save Outfit Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Outfit</DialogTitle>
            <DialogDescription>
              This outfit will be saved to your personal collection.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOutfit && (
            <div className="py-4">
              <h3 className="font-medium mb-2">{selectedOutfit.name}</h3>
              <div className="space-y-2 text-sm mb-4">
                {selectedOutfit.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-wardrobe-blue"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={confirmSaveOutfit}>
              Save to Collection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AI;
