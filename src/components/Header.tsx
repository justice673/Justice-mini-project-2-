'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Search, User, LogOut, ChevronDown } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  // Mock authentication state - in a real app, this would come from context/state management
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };
  
  // Generate user initials for profile picture
  const userInitials = isLoggedIn ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    // In a real app, this would handle logout logic
    console.log('User logged out');
  };

  // Toggle login state for demo purposes (remove in real app)
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="flex justify-between items-center">
        
        {/* Left: Site Name */}
        <Link href="/" className="flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent cursor-pointer" style={{ fontFamily: 'Caveat, cursive' }}>
            J's Recipe Box
          </h2>
        </Link>
        
        {/* Center: View Recipes */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <Link href="/recipes" className="text-white hover:text-green-300 transition-colors" style={{ fontFamily: 'Caveat, cursive' }}>
            <span className="text-xl font-bold">View Recipes</span>
          </Link>
        </div>
        
        {/* Right: Search and Auth */}
        <div className="flex gap-2 md:gap-4 items-center">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all w-32 sm:w-48 md:w-64 text-sm"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            />
          </form>
          
          {/* Mobile View Recipes */}
          <Link href="/recipes" className="md:hidden text-white hover:text-green-300 transition-colors" style={{ fontFamily: 'Caveat, cursive' }}>
            <span className="text-sm font-semibold">Recipes</span>
          </Link>
          
          {/* Auth Section */}
          <div className="hidden sm:flex gap-2 md:gap-4 items-center">
            {isLoggedIn ? (
              /* Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-white hover:text-green-300 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white/30" style={{ fontFamily: 'Caveat, cursive' }}>
                    {userInitials}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Signup Buttons */
              <>
                <Link href="/login">
                  <button className="text-white px-3 md:px-6 py-2 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-white/30" style={{ fontFamily: 'Caveat, cursive' }}>
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-6 py-2 transition-all duration-300" style={{ fontFamily: 'Caveat, cursive' }}>
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>
          
          {/* Demo Toggle Button - Remove in production */}
          <button
            onClick={toggleLoginState}
            className="hidden sm:block text-xs text-white/70 hover:text-white transition-colors ml-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            {isLoggedIn ? 'Demo: Logout' : 'Demo: Login'}
          </button>
          
          {/* Favorites Icon with Count */}
          <Link href="/profile" className="relative bg-transparent border border-white/30 p-2 backdrop-blur-sm rounded hover:bg-white/10 transition-colors">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-green-400" fill="currentColor" />
            {/* Badge */}
            {isLoggedIn && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white/30" style={{ fontFamily: 'Outfit, sans-serif' }}>
                4
              </span>
            )}
          </Link>
        </div>
        
      </div>
      
      {/* Mobile Auth Section */}
      <div className="sm:hidden flex gap-2 mt-3 justify-end items-center">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-white hover:text-green-300 transition-colors px-3 py-1"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold border border-white/30">
                {userInitials}
              </div>
              <span className="text-sm">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-white px-3 py-1 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-white/30 text-sm"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <button className="text-white px-4 py-1 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-white/30" style={{ fontFamily: 'Caveat, cursive' }}>
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 transition-all duration-300" style={{ fontFamily: 'Caveat, cursive' }}>
                Get Started
              </button>
            </Link>
          </>
        )}
        
        {/* Demo Toggle - Remove in production */}
        <button
          onClick={toggleLoginState}
          className="text-xs text-white/70 hover:text-white transition-colors ml-2"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Toggle
        </button>
      </div>
    </header>
  );
}
