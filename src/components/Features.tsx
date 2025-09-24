import React from 'react';
import { ChefHat, Users, Camera } from 'lucide-react';

export default function Features() {
  return (
    <section className="py-20 px-8 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
            Why Choose J&apos;s Recipe Box?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Everything you need to discover, share, and create amazing recipes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              Expert Recipes
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Curated recipes from professional chefs and passionate home cooks around the world.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              Community Driven
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Join thousands of food enthusiasts sharing their favorite recipes and cooking tips.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              Beautiful Photos
            </h3>
            <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
              High-quality photos and step-by-step visual guides for every recipe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
