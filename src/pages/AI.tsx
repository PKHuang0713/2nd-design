
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
          items: ["Black T-Shirt", "Blue Jeans", "White Sneakers"]
        },
        {
          id: 2,
          name: "Dressy 1",
          items: ["White Shirt", "Black Dress Pants", "Black Dress Shoes"]
        },
        {
          id: 3,
          name: "Casual 2",
          items: ["Gray Hoodie", "Blue Jeans", "White Sneakers"]
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

      {/* AI Features */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">How AI Helps Your Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
              <Sparkles className="w-6 h-6 text-wardrobe-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Smart Recommendations</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your wardrobe and suggests outfits that complement your style.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
              <Sparkles className="w-6 h-6 text-wardrobe-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Occasion-Based Styling</h3>
            <p className="text-muted-foreground">
              Get recommendations for different occasions - casual, formal, business, and more.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
              <Sparkles className="w-6 h-6 text-wardrobe-blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Seasonal Suggestions</h3>
            <p className="text-muted-foreground">
              Receive season-appropriate outfit ideas based on current weather trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;
