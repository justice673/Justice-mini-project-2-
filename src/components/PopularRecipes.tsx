import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

export default function PopularRecipes() {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
            Popular Recipes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Discover the most loved recipes from our community of food enthusiasts
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Recipe Card 1 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://themewagon.github.io/delicious/img/bg-img/r1.jpg"
                alt="Delicious Homemade Burger"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Delicious Homemade Burger
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                A juicy, flavorful burger made with fresh ingredients and secret seasonings.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>15 min</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1" style={{ fontFamily: 'Caveat, cursive' }}>
                  View Recipe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Card 2 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://themewagon.github.io/delicious/img/bg-img/r2.jpg"
                alt="Fresh Garden Salad"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Fresh Garden Salad
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                A refreshing mix of seasonal vegetables with homemade vinaigrette.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>10 min</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1" style={{ fontFamily: 'Caveat, cursive' }}>
                  View Recipe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Card 3 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://themewagon.github.io/delicious/img/bg-img/r3.jpg"
                alt="Chocolate Cake Delight"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Chocolate Cake Delight
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Rich, moist chocolate cake that melts in your mouth with every bite.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>45 min</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1" style={{ fontFamily: 'Caveat, cursive' }}>
                  View Recipe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Card 4 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://themewagon.github.io/delicious/img/bg-img/r4.jpg"
                alt="Creamy Pasta Primavera"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Creamy Pasta Primavera
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Perfectly cooked pasta with fresh vegetables in a creamy sauce.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>25 min</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1" style={{ fontFamily: 'Caveat, cursive' }}>
                  View Recipe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Card 5 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://themewagon.github.io/delicious/img/bg-img/r5.jpg"
                alt="Grilled Salmon"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Grilled Salmon
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Perfectly seasoned salmon grilled to perfection with lemon herbs.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>20 min</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1" style={{ fontFamily: 'Caveat, cursive' }}>
                  View Recipe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Card 6 */}
          <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="https://themewagon.github.io/delicious/img/bg-img/r6.jpg"
                alt="Fresh Berry Smoothie"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                Fresh Berry Smoothie
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                A healthy blend of fresh berries, yogurt, and natural sweeteners.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>5 min</span>
                </div>
                <button className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1" style={{ fontFamily: 'Caveat, cursive' }}>
                  View Recipe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/recipes">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1" style={{ fontFamily: 'Caveat, cursive' }}>
                View All Recipes
              </button>
            </Link>
          </div>
      </div>
    </section>
  );
}
