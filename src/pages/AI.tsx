import React, { useState, useEffect } from 'react';
import { Shirt, Sparkles, RefreshCw, Backpack, Footprints, HardHat, Heart, Award, ShoppingBag } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const AI = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<Array<{id: number, name: string, items: string[], types: string[], saved: boolean}>>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<{id: number, name: string, items: string[], types: string[]} | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("smart-casual");

  const styleOptions = [
    { value: "casual", label: "Casual", icon: <Shirt /> },
    { value: "smart-casual", label: "Smart Casual", icon: <ShoppingBag /> },
    { value: "formal", label: "Formal", icon: <Sparkles /> },
  ];

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

  const getRandomItemCount = () => {
    return Math.floor(Math.random() * 4) + 3;
  };

  const generateOutfits = () => {
    setLoading(true);
    
    setTimeout(() => {
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
      
      const styleOutfits = {
        casual: {
          themes: ["Weekend Casual", "Everyday Comfort", "Relaxed Look", "Casual Outing", "Laid-back Style"],
          items: {
            "Short Sleeve": ["Relaxed T-Shirt", "Casual Polo", "Vintage Tee", "Comfortable Henley"],
            "Shoes": ["Casual Sneakers", "Slip-on Shoes", "Canvas Shoes", "Comfortable Loafers"],
            "Long Pants": ["Distressed Jeans", "Cargo Pants", "Track Pants", "Joggers"]
          }
        },
        "smart-casual": {
          themes: ["Polished Casual", "Elevated Weekend", "Smart Comfort", "Refined Casual", "Dressed-down Chic"],
          items: {
            "Long Sleeve": ["Button-down Oxford", "Casual Dress Shirt", "Knit Polo", "Fine Merino Sweater"],
            "Long Pants": ["Dark Wash Jeans", "Tailored Chinos", "Wool-blend Trousers", "Premium Denim"]
          }
        },
        formal: {
          themes: ["Black Tie Event", "Elegant Evening", "Formal Occasion", "Sophisticated Gala", "Special Ceremony"],
          items: {
            "Long Sleeve": ["Crisp Tuxedo Shirt", "Wing Collar Shirt", "French Cuff Evening Shirt", "Formal Dress Shirt"],
            "Long Pants": ["Wool Tuxedo Trousers", "Formal Black Pants", "Satin-striped Pants", "Tailored Suit Pants"],
            "Shoes": ["Patent Leather Oxfords", "Formal Dress Shoes", "Evening Loafers", "Polished Black Shoes"]
          }
        }
      };
      
      const outfitThemes = styleOutfits[selectedStyle as keyof typeof styleOutfits]?.themes || 
        ["Casual Outfit", "Business Casual", "Summer Look", "Urban Style", "Outdoor Adventure", "Weekend Getaway"];
      
      const newOutfits = Array(3).fill(0).map((_, index) => {
        const itemCount = getRandomItemCount();
        
        const allTypes = Object.keys(clothingItems);
        const shuffledTypes = [...allTypes].sort(() => 0.5 - Math.random());
        const selectedTypes = shuffledTypes.slice(0, itemCount);
        
        const selectedItems = selectedTypes.map(type => {
          const styleSpecificItems = styleOutfits[selectedStyle as keyof typeof styleOutfits]?.items?.[type as keyof typeof clothingItems];
          const itemsOfType = styleSpecificItems || clothingItems[type as keyof typeof clothingItems];
          return itemsOfType[Math.floor(Math.random() * itemsOfType.length)];
        });
        
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
      toast.success(`${selectedStyle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} outfit suggestions generated!`);
    }, 1500);
  };

  const handleSaveOutfit = (outfit: {id: number, name: string, items: string[], types: string[]}) => {
    setSelectedOutfit(outfit);
    setShowSaveDialog(true);
  };

  const confirmSaveOutfit = () => {
    if (!selectedOutfit) return;
    
    setOutfits(prevOutfits => 
      prevOutfits.map(outfit => 
        outfit.id === selectedOutfit.id 
        ? {...outfit, saved: true} 
        : outfit
      )
    );
    
    const savedOutfitsJson = localStorage.getItem('savedOutfits');
    const savedOutfits = savedOutfitsJson ? JSON.parse(savedOutfitsJson) : [];
    
    const outfitToSave = {
      ...selectedOutfit,
      savedAt: new Date().toISOString()
    };
    
    savedOutfits.push(outfitToSave);
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
    
    setShowSaveDialog(false);
    
    toast.success("Outfit saved to your collection!");
  };

  const handleStyleChange = (value: string) => {
    setSelectedStyle(value);
    generateOutfits();
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

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Choose your style for today</h2>
        <div className="flex flex-col space-y-4">
          <div className="hidden md:block">
            <ToggleGroup type="single" value={selectedStyle} onValueChange={(value) => value && handleStyleChange(value)} className="justify-start">
              {styleOptions.map((style) => (
                <ToggleGroupItem key={style.value} value={style.value} aria-label={style.label} className="flex items-center gap-2">
                  {style.icon}
                  <span>{style.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="md:hidden">
            <Select value={selectedStyle} onValueChange={handleStyleChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    <div className="flex items-center gap-2">
                      {style.icon}
                      <span>{style.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

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
            </div>
          ))}
        </div>
      )}

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
