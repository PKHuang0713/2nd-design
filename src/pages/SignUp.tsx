
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    // Mock signup success
    toast.success("Account created successfully!");
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 animate-scale-in">
          <div className="blue-card mb-8">
            <h1 className="text-2xl font-semibold mb-1">Welcome,</h1>
            <p className="text-white/80">Sign up to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
              Continue <ArrowRight size={16} />
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-wardrobe-blue hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Illustration */}
      <div className="hidden lg:block fixed bottom-0 right-0 p-8">
        <img 
          src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png" 
          alt="Illustration" 
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};

export default SignUp;
