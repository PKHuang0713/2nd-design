
import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Upload, Search, ArrowRight } from 'lucide-react';

const Home = () => {
  // Mock clothing data
  const recentItems = [
    { id: 1, name: 'Black Jacket', type: 'Outerwear' },
    { id: 2, name: 'White T-Shirt', type: 'Top' },
    { id: 3, name: 'Blue Jeans', type: 'Bottom' }
  ];

  return (
    <div className="wardrobe-container py-8 md:py-12 animate-fade-in">
      {/* Welcome section */}
      <section className="mb-10">
        <div className="glass-card p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Hi there, <span className="text-wardrobe-blue">welcome back!</span>
          </h1>
          <p className="text-muted-foreground">
            Let's help you manage your wardrobe today
          </p>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/wardrobe" className="blue-card hover:opacity-95 transition-opacity">
            <div className="flex flex-col items-center text-center">
              <Shirt className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-medium mb-2">My Wardrobe</h3>
              <p className="text-white/80 text-sm">
                View and manage all your clothing items
              </p>
            </div>
          </Link>

          <div className="glass-card p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-wardrobe-lightBlue rounded-full flex items-center justify-center mb-3">
                <Shirt className="w-8 h-8 text-wardrobe-blue" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
                <Link to="/ai" className="btn-primary flex-1 flex items-center justify-center">
                  <Search className="w-4 h-4 mr-2" /> Suggestions
                </Link>
              </div>
            </div>
          </div>

          <Link to="/wardrobe" className="light-blue-card hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <Upload className="w-8 h-8 mb-3 text-wardrobe-blue" />
              <h3 className="text-lg font-medium mb-2">Add New Items</h3>
              <p className="text-muted-foreground text-sm">
                Upload and catalog new clothing pieces
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent items */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Items</h2>
          <Link to="/wardrobe" className="text-wardrobe-blue hover:underline flex items-center">
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((item) => (
            <div key={item.id} className="glass-card p-4 hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                <Shirt className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outfit suggestion */}
      <section>
        <div className="glass-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3">Need outfit ideas?</h2>
              <p className="text-muted-foreground mb-4">
                Get AI-powered outfit suggestions based on your wardrobe and style preferences
              </p>
              <Link to="/ai" className="btn-primary inline-flex items-center">
                Get Suggestions <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                    <Shirt className="w-10 h-10 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
