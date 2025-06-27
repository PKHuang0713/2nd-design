
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, ChevronLeft, Edit2 } from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

const Account = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editFullName, setEditFullName] = useState(profile?.full_name || '');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    const { error } = await updateProfile({
      full_name: editFullName
    });

    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="wardrobe-container py-8 md:py-12">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

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
        <h1 className="text-xl font-semibold mb-1">
          {profile.full_name || 'User'}
        </h1>
        <p className="text-white/80 text-sm">Member since {memberSince}</p>
      </div>

      <div className="glass-card p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Account Information</h2>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setEditFullName(profile.full_name || '');
            }}
            className="btn-outline flex items-center gap-2 text-sm px-3 py-2"
          >
            <Edit2 size={16} />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
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

          <div className="flex items-center">
            <div className="w-8 text-muted-foreground">
              <User size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Full Name</p>
              {isEditing ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="form-input flex-1"
                    placeholder="Enter your full name"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p>{profile.full_name || 'Not set'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleSignOut}
          className="btn-danger w-full text-left flex items-center gap-2"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Account;
