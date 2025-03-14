
import React, { useState, useEffect } from 'react';
import { Shirt, Backpack, Footprints, HardHat, Trash, BookmarkCheck } from 'lucide-react';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Types
interface SavedOutfit {
  id: number;
  name: string;
  items: string[];
  types: string[];
  savedAt: string;
}

const SavedOutfits = () => {
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState<SavedOutfit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved outfits from localStorage
  useEffect(() => {
    // Simulating a loading delay
    setTimeout(() => {
      const savedOutfitsJson = localStorage.getItem('savedOutfits');
      if (savedOutfitsJson) {
        setSavedOutfits(JSON.parse(savedOutfitsJson));
      }
      setIsLoading(false);
    }, 500);
  }, []);

  // Get appropriate icon for clothing type
  const getClothingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'bags':
        return <Backpack className="w-8 h-8 text-muted-foreground" />;
      case 'shoes':
        return <Footprints className="w-8 h-8 text-muted-foreground" />;
      case 'hats':
        return <HardHat className="w-8 h-8 text-muted-foreground" />;
      default:
        return <Shirt className="w-8 h-8 text-muted-foreground" />;
    }
  };

  // Handle removing an outfit
  const handleRemoveOutfit = (outfit: SavedOutfit) => {
    setSelectedOutfit(outfit);
    setShowConfirmDialog(true);
  };

  // Confirm removing an outfit
  const confirmRemoveOutfit = () => {
    if (!selectedOutfit) return;
    
    const updatedOutfits = savedOutfits.filter(outfit => outfit.id !== selectedOutfit.id);
    setSavedOutfits(updatedOutfits);
    
    // Update localStorage
    localStorage.setItem('savedOutfits', JSON.stringify(updatedOutfits));
    
    // Close the dialog
    setShowConfirmDialog(false);
    
    // Show success message
    toast.success("Outfit removed from your collection");
  };

  return (
    <div className="saved-outfits-container py-8 md:py-12 animate-fade-in">
      <div className="flex items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Saved Outfits</h1>
          <p className="text-muted-foreground">
            View and manage your saved outfit collections
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="glass-card p-8 flex justify-center items-center">
          <div className="loading-spinner"></div>
        </div>
      ) : savedOutfits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedOutfits.map((outfit) => (
            <div key={outfit.id} className="glass-card p-5 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{outfit.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      Saved
                    </span>
                    <button 
                      onClick={() => handleRemoveOutfit(outfit)}
                      className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-muted transition-colors"
                      aria-label="Remove outfit"
                    >
                      <Trash className="w-5 h-5 text-muted-foreground hover:text-rose-500" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {outfit.items.map((item, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      {getClothingIcon(outfit.types[i] || '')}
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
              <div className="mt-4 text-xs text-muted-foreground">
                Saved on {new Date(outfit.savedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <BookmarkCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No saved outfits yet</h3>
          <p className="text-muted-foreground mb-4">
            You haven't saved any outfits yet. Go to the AI Suggestions page to discover and save some outfits!
          </p>
          <Button variant="default" onClick={() => window.location.href = '/ai'}>
            Get AI Suggestions
          </Button>
        </div>
      )}

      {/* Confirm Remove Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Outfit</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this outfit from your collection?
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
            <Button variant="destructive" onClick={confirmRemoveOutfit}>
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedOutfits;
