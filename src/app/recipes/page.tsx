'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Star, ArrowRight } from 'lucide-react';
import RecipeFilters from '@/components/RecipeFilters';
import Pagination from '@/components/Pagination';

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all');
  const [selectedTime, setSelectedTime] = React.useState('all');
  const [showFilters, setShowFilters] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  // New advanced filter states
  const [ingredientFilter, setIngredientFilter] = React.useState('');
  const [selectedCuisine, setSelectedCuisine] = React.useState('all');
  const [selectedDiet, setSelectedDiet] = React.useState('all');
  const [calorieRange, setCalorieRange] = React.useState('all');
  const [userLikes, setUserLikes] = React.useState<{ [key: string]: boolean }>({});

  const recipesPerPage = 6;



  // Sample recipe data - in a real app, this would come from an API
  const recipes = [
    {
      id: 1,
      title: 'Delicious Homemade Burger',
      description: 'A juicy, flavorful burger made with fresh ingredients and secret seasonings.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r1.jpg',
      time: '15 min',
      prepTime: 15,
      difficulty: 'easy',
      category: 'lunch',
      cuisine: 'american',
      diet: 'none',
      serves: 4,
      rating: 4.8,
      calories: 650,
      liked: false,
      ingredients: ['ground beef', 'burger buns', 'cheese', 'lettuce', 'tomato', 'onion']
    },
    {
      id: 2,
      title: 'Fresh Garden Salad',
      description: 'A refreshing mix of seasonal vegetables with homemade vinaigrette.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r2.jpg',
      time: '10 min',
      prepTime: 10,
      difficulty: 'easy',
      category: 'lunch',
      cuisine: 'mediterranean',
      diet: 'vegetarian',
      serves: 2,
      rating: 4.6,
      calories: 180,
      liked: true,
      ingredients: ['lettuce', 'tomato', 'cucumber', 'olive oil', 'vinegar', 'herbs']
    },
    {
      id: 3,
      title: 'Chocolate Cake Delight',
      description: 'Rich, moist chocolate cake that melts in your mouth with every bite.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r3.jpg',
      time: '45 min',
      prepTime: 45,
      difficulty: 'medium',
      category: 'dessert',
      cuisine: 'french',
      diet: 'vegetarian',
      serves: 8,
      rating: 4.9,
      calories: 450,
      liked: false,
      ingredients: ['chocolate', 'flour', 'eggs', 'butter', 'sugar', 'vanilla']
    },
    {
      id: 4,
      title: 'Creamy Pasta Primavera',
      description: 'Perfectly cooked pasta with fresh vegetables in a creamy sauce.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r4.jpg',
      time: '25 min',
      prepTime: 25,
      difficulty: 'medium',
      category: 'dinner',
      cuisine: 'italian',
      diet: 'vegetarian',
      serves: 4,
      rating: 4.7,
      calories: 520,
      liked: true,
      ingredients: ['pasta', 'cream', 'vegetables', 'parmesan', 'herbs', 'garlic']
    },
    {
      id: 5,
      title: 'Grilled Salmon',
      description: 'Perfectly seasoned salmon grilled to perfection with lemon herbs.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r5.jpg',
      time: '20 min',
      prepTime: 20,
      difficulty: 'medium',
      category: 'dinner',
      cuisine: 'nordic',
      diet: 'keto',
      serves: 2,
      rating: 4.8,
      calories: 380,
      liked: false,
      ingredients: ['salmon', 'lemon', 'herbs', 'olive oil', 'garlic', 'pepper']
    },
    {
      id: 6,
      title: 'Fresh Berry Smoothie',
      description: 'A healthy blend of fresh berries, yogurt, and natural sweeteners.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/r6.jpg',
      time: '5 min',
      prepTime: 5,
      difficulty: 'easy',
      category: 'beverage',
      cuisine: 'american',
      diet: 'vegetarian',
      serves: 1,
      rating: 4.5,
      calories: 220,
      liked: true,
      ingredients: ['berries', 'yogurt', 'honey', 'milk', 'ice']
    },
    {
      id: 7,
      title: 'Pancakes with Syrup',
      description: 'Fluffy pancakes served with maple syrup and fresh berries.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/bg1.jpg',
      time: '20 min',
      prepTime: 20,
      difficulty: 'easy',
      category: 'breakfast',
      cuisine: 'american',
      diet: 'vegetarian',
      serves: 3,
      rating: 4.7,
      calories: 380,
      liked: false,
      ingredients: ['flour', 'eggs', 'milk', 'maple syrup', 'berries', 'butter']
    },
    {
      id: 8,
      title: 'Avocado Toast',
      description: 'Crispy toast topped with fresh avocado, herbs, and a drizzle of olive oil.',
      image: 'https://themewagon.github.io/delicious/img/bg-img/insta5.jpg',
      time: '8 min',
      prepTime: 8,
      difficulty: 'easy',
      category: 'breakfast',
      cuisine: 'modern',
      diet: 'vegan',
      serves: 2,
      rating: 4.4,
      calories: 280,
      liked: true,
      ingredients: ['avocado', 'bread', 'olive oil', 'lemon', 'herbs', 'salt']
    }
  ];

  React.useEffect(() => {
    // Optionally, fetch user's liked recipes from backend to initialize userLikes
    // For now, initialize from recipes array if available
    const likes: { [key: string]: boolean } = {};
    recipes.forEach(r => { likes[r.id] = r.liked; });
    setUserLikes(likes);
  }, []);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedTime('all');
    setSearchQuery('');
    setIngredientFilter('');
    setSelectedCuisine('all');
    setSelectedDiet('all');
    setCalorieRange('all');
    setCurrentPage(0);
  };

  const handleLike = async (recipeId: string | number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated.');
      const res = await fetch(`http://localhost:5000/api/recipes/${recipeId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to like recipe');
      }
      setUserLikes(prev => ({ ...prev, [recipeId]: !prev[recipeId] }));
    } catch (err: any) {
      alert(err.message || 'Failed to like recipe');
    }
  };

  // Filter recipes based on selected filters
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIngredients = ingredientFilter === '' || 
                              recipe.ingredients.some(ingredient => 
                                ingredient.toLowerCase().includes(ingredientFilter.toLowerCase())
                              );
    
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    const matchesCuisine = selectedCuisine === 'all' || recipe.cuisine === selectedCuisine;
    const matchesDiet = selectedDiet === 'all' || recipe.diet === selectedDiet;
    
    let matchesTime = true;
    if (selectedTime !== 'all') {
      const prepTime = recipe.prepTime;
      switch (selectedTime) {
        case '0-15':
          matchesTime = prepTime <= 15;
          break;
        case '15-30':
          matchesTime = prepTime > 15 && prepTime <= 30;
          break;
        case '30-60':
          matchesTime = prepTime > 30 && prepTime <= 60;
          break;
        case '60+':
          matchesTime = prepTime > 60;
          break;
      }
    }
    
    let matchesCalories = true;
    if (calorieRange !== 'all') {
      const calories = recipe.calories;
      switch (calorieRange) {
        case '0-200':
          matchesCalories = calories <= 200;
          break;
        case '200-400':
          matchesCalories = calories > 200 && calories <= 400;
          break;
        case '400-600':
          matchesCalories = calories > 400 && calories <= 600;
          break;
        case '600+':
          matchesCalories = calories > 600;
          break;
      }
    }
    
    return matchesSearch && matchesIngredients && matchesCategory && matchesDifficulty && 
           matchesCuisine && matchesDiet && matchesTime && matchesCalories;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    // Scroll to top of recipes section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back to Home */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">Back to Home</span>
            </Link>

            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
              All Recipes
            </h1>

            {/* Favicon */}
            <div className="bg-transparent border border-gray-300 p-2">
              <Heart className="w-5 h-5 text-green-600" fill="currentColor" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <RecipeFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            clearFilters={clearFilters}
            ingredientFilter={ingredientFilter}
            setIngredientFilter={setIngredientFilter}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
            selectedDiet={selectedDiet}
            setSelectedDiet={setSelectedDiet}
            calorieRange={calorieRange}
            setCalorieRange={setCalorieRange}
          />

          {/* Recipes Grid */}
          <div className="lg:col-span-4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredRecipes.length)} of {filteredRecipes.length} recipes
                </p>
                <Link
                  href="/search"
                  className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
                  style={{ fontFamily: 'Caveat, cursive' }}
                >
                  Advanced Search →
                </Link>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <option>Sort by: Most Popular</option>
                <option>Sort by: Newest</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Cooking Time</option>
              </select>
            </div>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <button
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      onClick={() => handleLike(recipe.id)}
                      title={userLikes[recipe.id] ? 'Unlike' : 'Like'}
                    >
                      <Heart className={`w-5 h-5 ${userLikes[recipe.id] ? 'text-green-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {recipe.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
                      {recipe.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {recipe.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-green-600 font-semibold text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {recipe.time}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-500 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {recipe.serves}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ChefHat className={`w-4 h-4 mr-1 ${
                          recipe.difficulty === 'easy' ? 'text-green-500' :
                          recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                        <span className={`text-sm font-semibold capitalize ${
                          recipe.difficulty === 'easy' ? 'text-green-500' :
                          recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                        }`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= Math.floor(recipe.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          ({recipe.rating})
                        </span>
                      </div>
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                        style={{ fontFamily: 'Caveat, cursive' }}
                      >
                        View Recipe
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />

            {/* No Results Message */}
            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <ChefHat className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                  No Recipes Found
                </h3>
                <p className="text-gray-500" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Try adjusting your filters or search terms to find more recipes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
