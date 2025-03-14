
import React, { useState, useEffect } from 'react';
import { Shirt, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from "sonner";

const AI = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState<Array<{id: number, name: string, items: string[]}>>([]);

  // Mock AI generation
  const generateOutfits = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newOutfits = [
        {
          id: 1,
          name: "Casual 1",
          items: [
            "Black T-Shirt", 
            "Blue Jeans", 
            "White Sneakers", 
            "Silver Watch", 
            "Black Belt", 
            "Gray Socks"
          ]
        },
        {
          id: 2,
          name: "Dressy 1",
          items: [
            "White Shirt", 
            "Black Dress Pants", 
            "Black Dress Shoes", 
            "Black Belt", 
            "Silver Tie Clip", 
            "Black Socks"
          ]
        },
        {
          id: 3,
          name: "Casual 2",
          items: [
            "Gray Hoodie", 
            "Blue Jeans", 
            "White Sneakers", 
            "Black Beanie", 
            "Silver Chain", 
            "White Socks"
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
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <Shirt className="w-8 h-8 text-muted-foreground" />
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
