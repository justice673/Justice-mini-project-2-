import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="https://themewagon.github.io/delicious/img/bg-img/bg1.jpg"
          alt="Delicious food background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-40 w-full px-8 flex items-center min-h-screen">
        <div className="max-w-2xl ml-0">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-none tracking-tight">
            <span className="drop-shadow-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>Welcome to</span>
            <br />
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent drop-shadow-none" style={{ fontFamily: 'Caveat, cursive' }}>
              J's Recipe Box
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl mb-4 text-white/95 font-medium leading-tight" style={{ fontFamily: 'Caveat, cursive' }}>
            <span className="drop-shadow-lg">Where Every Recipe Tells a Story</span>
          </p>

          <p className="text-lg md:text-xl mb-12 text-white/85 leading-relaxed max-w-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="drop-shadow-md">
              Discover incredible recipes, share your culinary creations, and connect with food lovers from around the world. 
              From grandmother's secret recipes to modern culinary innovations.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-base font-semibold shadow-2xl shadow-green-500/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/40 border-0" style={{ fontFamily: 'Caveat, cursive' }}>
              Explore Recipes
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 text-base font-semibold border border-white/50 hover:border-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1" style={{ fontFamily: 'Caveat, cursive' }}>
              Share Your Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
