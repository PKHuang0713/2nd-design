
import React from 'react';
import { Settings as SettingsIcon, Bell, Lock, Eye, User, HelpCircle } from 'lucide-react';

const Settings = () => {
  return (
    <div className="max-w-4xl animate-fade-in">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <SettingsIcon className="w-6 h-6 text-wardrobe-blue" />
        Settings
      </h1>
      
      <div className="space-y-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <SettingsItem 
              icon={<User className="w-5 h-5 text-wardrobe-blue" />} 
              title="Profile Information"
              description="Update your personal details and profile picture"
            />
            
            <SettingsItem 
              icon={<Lock className="w-5 h-5 text-wardrobe-blue" />} 
              title="Password & Security"
              description="Manage your password and security preferences"
            />
            
            <SettingsItem 
              icon={<Bell className="w-5 h-5 text-wardrobe-blue" />} 
              title="Notifications"
              description="Configure your notification preferences"
            />
          </div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium mb-4">Application Settings</h2>
          
          <div className="space-y-4">
            <SettingsItem 
              icon={<Eye className="w-5 h-5 text-wardrobe-blue" />} 
              title="Appearance"
              description="Customize the look and feel of the application"
            />
            
            <SettingsItem 
              icon={<HelpCircle className="w-5 h-5 text-wardrobe-blue" />} 
              title="Help & Support"
              description="Get help with using Clothify"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors">
      <div className="mt-0.5 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Settings;
