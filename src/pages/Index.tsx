
import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Check } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="wardrobe-container pt-10 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 flex flex-col items-center text-center animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Manage Your Wardrobe, <span className="text-wardrobe-blue">Effortlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Clothify helps you organize your clothing items, create stunning outfits, and get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-3 flex items-center justify-center gap-2">
                <span>Get Started</span>
              </Link>
              <Link to="/signin" className="btn-outline text-lg px-8 py-3 flex items-center justify-center gap-2">
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Smart Wardrobe Management
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <FeatureCard
                icon={<Shirt className="w-8 h-8 text-wardrobe-blue" />}
                title="Organize Your Clothes"
                description="Easily catalog and organize all your clothing items in one place."
              />
              <FeatureCard
                icon={<Check className="w-8 h-8 text-wardrobe-blue" />}
                title="Create Outfits"
                description="Mix and match items to create stunning outfit combinations."
              />
              <FeatureCard
                icon={<Shirt className="w-8 h-8 text-wardrobe-blue" />}
                title="AI Recommendations"
                description="Get personalized outfit suggestions based on your style preferences."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 text-center">
          <div className="glass-card max-w-4xl mx-auto p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your wardrobe?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of users who have simplified their clothing management.
            </p>
            <Link to="/signup" className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center">
              Sign Up Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 pb-10">
          <div className="border-t border-border pt-10">
            <div className="flex justify-center items-center">
              <div className="flex items-center gap-2">
                <Shirt className="w-5 h-5 text-wardrobe-blue" />
                <span className="font-semibold">Clothify</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-6 transition-all duration-300 hover:shadow-lg animate-scale-in">
      <div className="rounded-full bg-primary/10 p-3 w-fit mb-5">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
