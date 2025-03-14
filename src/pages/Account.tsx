
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, ChevronLeft } from 'lucide-react';
import { toast } from "sonner";

const Account = () => {
  const navigate = useNavigate();
  const [user] = useState({
    email: 'user@example.com',
    name: 'John Doe',
    joined: 'January 2023'
  });

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="wardrobe-container py-8 md:py-12 animate-fade-in">
      <button
        onClick={handleGoBack}
        className="flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft size={16} className="mr-1" /> Back
      </button>

      <div className="blue-card mb-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <User size={32} />
        </div>
        <h1 className="text-xl font-semibold mb-1">{user.name}</h1>
        <p className="text-white/80 text-sm">Member since {user.joined}</p>
      </div>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 text-muted-foreground">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button className="btn-outline w-full text-left flex items-center gap-2">
          <User size={18} /> Edit Profile
        </button>
        
        <button
          onClick={handleSignOut}
          className="btn-danger w-full text-left flex items-center gap-2"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground">
          © 2023 Clothify. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Account;
