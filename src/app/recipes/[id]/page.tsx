'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Star, ArrowRight } from 'lucide-react';

interface RecipeDetailsProps {
  params: {
    id: string;
  };
}

export default function RecipeDetailsPage({ params }: RecipeDetailsProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [showRateModal, setShowRateModal] = React.useState(false);
  const [userRating, setUserRating] = React.useState(0);
  const [rateStatus, setRateStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rateMessage, setRateMessage] = React.useState('');

  // Sample recipe data - in a real app, this would come from an API based on params.id
  const recipe = {
    id: parseInt(params.id),
    title: 'Delicious Homemade Burger',
    description: 'A juicy, flavorful burger made with fresh ingredients and secret seasonings that will make your taste buds dance with joy.',
    image: 'https://themewagon.github.io/delicious/img/bg-img/r1.jpg',
    time: '25 min',
    difficulty: 'easy',
    category: 'lunch',
    serves: 4,
    rating: 4.8,
    reviews: 127,
    prepTime: '15 min',
    cookTime: '10 min',
    ingredients: [
      '500g ground beef (80/20 lean)',
      '4 brioche burger buns',
      '4 slices of cheddar cheese',
      '1 large tomato, sliced',
      '1 red onion, sliced',
      '4 lettuce leaves',
      '2 tbsp mayonnaise',
      '1 tbsp ketchup',
      '1 tbsp mustard',
      'Salt and pepper to taste',
      '1 tbsp olive oil'
    ],
    instructions: [
      'Season the ground beef with salt and pepper, then form into 4 equal patties.',
      'Heat olive oil in a large skillet or grill pan over medium-high heat.',
      'Cook the patties for 3-4 minutes per side, adding cheese in the last minute.',
      'Toast the burger buns lightly in the same pan.',
      'Spread mayonnaise, ketchup, and mustard on the bottom bun.',
      'Layer with lettuce, tomato, onion, and the cooked patty.',
      'Top with the other half of the bun and serve immediately.',
      'Enjoy your delicious homemade burger!'
    ],
    nutrition: {
      calories: 650,
      protein: '35g',
      carbs: '45g',
      fat: '38g'
    }
  };

  // Similar recipes data
  const similarRecipes = [
    {
      id: 2,
      title: 'BBQ Chicken Burger',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r2.jpg',
      time: '30 min',
      rating: 4.6
    },
    {
      id: 3,
      title: 'Veggie Black Bean Burger',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r3.jpg',
      time: '20 min',
      rating: 4.4
    },
    {
      id: 4,
      title: 'Turkey Avocado Burger',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r4.jpg',
      time: '25 min',
      rating: 4.7
    }
  ];

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('token');

  const handleRateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRateStatus('loading');
    setRateMessage('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to rate.');
      const res = await fetch(`http://localhost:5000/api/recipes/${recipe.id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating: userRating })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to rate recipe');
      setRateStatus('success');
      setRateMessage('Thank you for rating!');
      setShowRateModal(false);
    } catch (err: any) {
      setRateStatus('error');
      setRateMessage(err.message || 'Failed to rate recipe');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back to Recipes */}
            <Link 
              href="/recipes" 
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">Back to Recipes</span>
            </Link>

            {/* Recipe Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center" style={{ fontFamily: 'Caveat, cursive' }}>
              {recipe.title}
            </h1>

            {/* Favicon */}
            <div className="bg-transparent border border-gray-300 p-2">
              <Heart className="w-5 h-5 text-green-600" fill="currentColor" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Recipe Image */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
            />
            <button 
              onClick={() => {
                if (isLoggedIn) setShowRateModal(true);
                else alert('Please log in to like or rate recipes.');
              }}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
              title={isLoggedIn ? 'Rate & Like' : 'Login required'}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'text-green-500 fill-current' : 'text-gray-600'}`} />
            </button>
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {recipe.category}
              </span>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Caveat, cursive' }}>
                {recipe.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {recipe.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${star <= Math.floor(recipe.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {recipe.rating} ({recipe.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Recipe Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Total Time</p>
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{recipe.time}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Serves</p>
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{recipe.serves}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <ChefHat className={`w-6 h-6 mx-auto mb-2 ${
                  recipe.difficulty === 'easy' ? 'text-green-500' :
                  recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Difficulty</p>
                <p className={`font-semibold capitalize ${
                  recipe.difficulty === 'easy' ? 'text-green-500' :
                  recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {recipe.difficulty}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="w-6 h-6 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Cal</span>
                </div>
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>Calories</p>
                <p className="font-semibold text-gray-800" style={{ fontFamily: 'Outfit, sans-serif' }}>{recipe.nutrition.calories}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Ingredients */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Ingredients
            </h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Caveat, cursive' }}>
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 pt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Similar Recipes */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: 'Caveat, cursive' }}>
            Similar Recipes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarRecipes.map((similar) => (
              <Link key={similar.id} href={`/recipes/${similar.id}`}>
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={similar.image}
                      alt={similar.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                      {similar.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {similar.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-gray-600 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {similar.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Rate & Like Modal */}
      {showRateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              Rate & Like Recipe
            </h2>
            <form onSubmit={handleRateSubmit} className="space-y-6">
              <div className="flex items-center gap-2 justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="focus:outline-none"
                  >
                    <Star className={`w-8 h-8 ${star <= userRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300"
                disabled={rateStatus === 'loading' || userRating === 0}
              >
                {rateStatus === 'loading' ? 'Submitting...' : 'Submit Rating'}
              </button>
              {rateStatus === 'error' && (
                <div className="text-red-600 text-center font-semibold">{rateMessage}</div>
              )}
              {rateStatus === 'success' && (
                <div className="text-green-600 text-center font-semibold">{rateMessage}</div>
              )}
              <button
                type="button"
                className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold"
                onClick={() => setShowRateModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
