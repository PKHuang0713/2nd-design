
import React from 'react';
import { Shirt, Heart, Shield, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="wardrobe-container py-8 md:py-12 animate-fade-in">
      <div className="blue-card mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">About ClothWise</h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          Simplifying wardrobe management with intelligent organization and AI-powered recommendations.
        </p>
      </div>

      <div className="glass-card p-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            ClothWise was created with a simple goal: to help people organize their wardrobes more efficiently and make better fashion choices. We believe that a well-organized wardrobe leads to less stress, more creativity, and more sustainable clothing habits.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
          <p className="text-muted-foreground mb-6">
            Our platform provides an intuitive interface to catalog and organize your clothing items, create outfits, and receive AI-powered style recommendations. We aim to make fashion more accessible, enjoyable, and sustainable for everyone.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                <Heart className="w-6 h-6 text-wardrobe-blue" />
              </div>
              <h3 className="font-medium mb-2">User-Focused</h3>
              <p className="text-sm text-muted-foreground">
                We prioritize user experience and strive to make our platform intuitive and enjoyable.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                <Shield className="w-6 h-6 text-wardrobe-blue" />
              </div>
              <h3 className="font-medium mb-2">Privacy-First</h3>
              <p className="text-sm text-muted-foreground">
                Your data is yours. We maintain strict privacy standards to protect your information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full bg-primary/10 p-3 w-fit mx-auto mb-3">
                <Clock className="w-6 h-6 text-wardrobe-blue" />
              </div>
              <h3 className="font-medium mb-2">Efficiency</h3>
              <p className="text-sm text-muted-foreground">
                We help you save time and reduce decision fatigue when choosing outfits.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <Shirt className="w-12 h-12 text-wardrobe-blue mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-4">Join Us</h2>
          <p className="text-muted-foreground mb-6">
            We're on a mission to transform how people interact with their wardrobes. Join thousands of users who have simplified their clothing management with ClothWise.
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn-primary">Sign Up Now</button>
            <button className="btn-outline">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
