
import React from 'react';
import { Shirt, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ClothingItem {
  id: number;
  name: string;
  type: string;
  color: string;
  season: string;
  favorite?: boolean;
}

interface FavoriteItemsProps {
  items: ClothingItem[];
  title?: string;
  showViewAll?: boolean;
  limit?: number;
}

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

const getColorCode = (colorName: string): string => {
  const normalizedColor = colorName.toLowerCase();
  return colorMap[normalizedColor] || '#CCCCCC'; // Default to gray if color not found
};

const FavoriteItems: React.FC<FavoriteItemsProps> = ({ 
  items, 
  title = "Favorite Items", 
  showViewAll = true,
  limit = 4 
}) => {
  const favoriteItems = items
    .filter(item => item.favorite)
    .slice(0, limit);

  if (favoriteItems.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showViewAll && (
          <Link to="/wardrobe" className="text-wardrobe-blue hover:underline">
            View all
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {favoriteItems.map((item) => (
          <div key={item.id} className="glass-card p-4 hover:shadow-lg transition-all duration-300">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
              <Shirt className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-medium truncate">{item.name}</h3>
              <Heart size={16} className="text-wardrobe-red" fill="currentColor" />
            </div>
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
    </section>
  );
};

export default FavoriteItems;
