
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shirt, Droplets, Sun, Calendar, Clock, CheckCircle, AlertCircle, Heart } from 'lucide-react';
import { toast } from "sonner";

interface LaundryItem {
  id: string;
  name: string;
  type: string;
  status: 'dirty' | 'washing' | 'drying' | 'clean';
  addedAt: Date;
  favorite?: boolean;
}

const LaundrySystem = () => {
  const [laundryItems, setLaundryItems] = useState<LaundryItem[]>([
    { id: '1', name: 'Blue T-Shirt', type: 'T-Shirt', status: 'dirty', addedAt: new Date(Date.now() - 86400000), favorite: true },
    { id: '2', name: 'Black Jeans', type: 'Pants', status: 'washing', addedAt: new Date(Date.now() - 43200000), favorite: false },
    { id: '3', name: 'White Socks', type: 'Socks', status: 'drying', addedAt: new Date(Date.now() - 21600000), favorite: false },
    { id: '4', name: 'Gray Hoodie', type: 'Outerwear', status: 'clean', addedAt: new Date(), favorite: true },
  ]);

  const updateStatus = (id: string, newStatus: 'dirty' | 'washing' | 'drying' | 'clean') => {
    setLaundryItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: newStatus, addedAt: new Date() } 
          : item
      )
    );
    
    const item = laundryItems.find(item => item.id === id);
    if (item) {
      toast(`${item.name} moved to ${newStatus} status`, {
        description: new Date().toLocaleTimeString(),
      });
    }
  };

  const toggleFavorite = (id: string) => {
    setLaundryItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, favorite: true } 
          : item
      )
    );
    
    const item = laundryItems.find(item => item.id === id);
    if (item && !item.favorite) {
      toast(`${item.name} added to favorites`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'dirty': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'washing': return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'drying': return <Sun className="h-4 w-4 text-orange-500" />;
      case 'clean': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dirty': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'washing': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'drying': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'clean': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return '';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const LaundryItemCard = ({ item }: { item: LaundryItem }) => (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shirt className="h-5 w-5 text-wardrobe-blue" />
            {item.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            {item.favorite && (
              <Heart size={16} className="text-wardrobe-red" fill="currentColor" />
            )}
            <Badge variant="outline" className={getStatusColor(item.status)}>
              {getStatusIcon(item.status)} {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          </div>
        </div>
        <CardDescription className="flex items-center gap-1">
          <span>{item.type}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 ml-2">
            <Calendar className="h-3 w-3" /> Added {formatDate(item.addedAt)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" /> Last updated: {item.addedAt.toLocaleTimeString()}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-2">
        {item.status !== 'dirty' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => updateStatus(item.id, 'dirty')}
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          >
            <AlertCircle className="h-4 w-4 mr-2" /> Mark Dirty
          </Button>
        )}
        {item.status !== 'washing' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => updateStatus(item.id, 'washing')}
            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            <Droplets className="h-4 w-4 mr-2" /> Washing
          </Button>
        )}
        {item.status !== 'drying' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => updateStatus(item.id, 'drying')}
            className="bg-orange-100 text-orange-800 hover:bg-orange-200"
          >
            <Sun className="h-4 w-4 mr-2" /> Drying
          </Button>
        )}
        {item.status !== 'clean' && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => updateStatus(item.id, 'clean')}
            className="bg-green-100 text-green-800 hover:bg-green-200"
          >
            <CheckCircle className="h-4 w-4 mr-2" /> Mark Clean
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-3xl font-bold tracking-tight">Laundry System</h1>
        </div>
        <p className="text-muted-foreground">
          Track your clothing through the laundry cycle from dirty to clean.
        </p>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="dirty">Dirty</TabsTrigger>
          <TabsTrigger value="washing">Washing</TabsTrigger>
          <TabsTrigger value="drying">Drying</TabsTrigger>
          <TabsTrigger value="clean">Clean</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {laundryItems.map(item => (
            <LaundryItemCard key={item.id} item={item} />
          ))}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-4">
          {laundryItems
            .filter(item => item.favorite)
            .map(item => <LaundryItemCard key={item.id} item={item} />)
          }
          {laundryItems.filter(item => item.favorite).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No favorite items yet
            </div>
          )}
        </TabsContent>
        
        {['dirty', 'washing', 'drying', 'clean'].map(status => (
          <TabsContent key={status} value={status} className="mt-4">
            {laundryItems
              .filter(item => item.status === status)
              .map(item => <LaundryItemCard key={item.id} item={item} />)
            }
            {laundryItems.filter(item => item.status === status).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No items in this category
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LaundrySystem;
