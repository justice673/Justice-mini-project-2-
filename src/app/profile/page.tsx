'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Star, ArrowRight, Plus, Settings, Edit, User } from 'lucide-react';
import Pagination from '@/components/Pagination';
import AddRecipeModal from '@/components/AddRecipeModal';

interface Recipe {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  difficulty: string;
  category: string;
  cuisine: string;
  diet: string;
  serves: number;
  calories?: number;
  ingredients: string[];
  instructions: string[];
  rating?: number;
  liked?: boolean;
  publishedDate?: string;
  [key: string]: unknown;
}

interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  joinedDate?: string;
  totalRecipes?: number;
  totalFavorites?: number;
  [key: string]: unknown;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState('favorites');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [publishedRecipes, setPublishedRecipes] = React.useState<Recipe[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [editRecipe, setEditRecipe] = React.useState<Recipe | null>(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = React.useState<Recipe[]>([]);
  const recipesPerPage = 6;

  React.useEffect(() => {
    const fetchProfileAndRecipes = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Not authenticated.');
        // Fetch user profile
        const userRes = await fetch('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!userRes.ok) throw new Error('Failed to fetch user profile');
        const userData = await userRes.json();
        setUser(userData);
        // Fetch published recipes
        const recipesRes = await fetch(`http://localhost:5000/api/recipes/user/${userData._id}`);
        if (!recipesRes.ok) throw new Error('Failed to fetch recipes');
        const recipesData = await recipesRes.json();
        setPublishedRecipes(recipesData);
      } catch (err: unknown) {
        let errorMsg = 'Failed to fetch profile or recipes';
        if (err instanceof Error) errorMsg = err.message;
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndRecipes();
  }, []);

  React.useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await fetch('http://localhost:5000/api/recipes/popular', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const allPopular = await res.json();
        // If backend supports a /api/recipes/favorites or similar, use that instead.
        // For now, filter recipes where user has liked them (assuming backend returns this info)
        const userId = user?._id;
        const liked = allPopular.filter((r: Record<string, unknown>) => Array.isArray(r.likedBy) && userId && r.likedBy.includes(userId));
        setFavoriteRecipes(liked);
      } catch {}
    };
    if (activeTab === 'favorites' && user) fetchFavorites();
  }, [activeTab, user]);

  // Get current recipes based on active tab
  const currentRecipes = activeTab === 'favorites' ? favoriteRecipes : publishedRecipes;
  // Calculate pagination
  const totalPages = Math.ceil(currentRecipes.length / recipesPerPage);
  const startIndex = currentPage * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const displayRecipes = currentRecipes.slice(startIndex, endIndex);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(0);
  };

  const handleAddRecipe = async (recipeData: Recipe) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated.');
      const res = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(recipeData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to add recipe');
      }
      // Refetch published recipes
      const userRes = await fetch('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      const recipesRes = await fetch(`http://localhost:5000/api/recipes/user/${userData._id}`);
      const recipesData = await recipesRes.json();
      setPublishedRecipes(recipesData);
      setActiveTab('published');
      setCurrentPage(0);
    } catch (err: unknown) {
      let errorMsg = 'Failed to add recipe';
      if (err instanceof Error) errorMsg = err.message;
      alert(errorMsg);
    }
  };

  const handleEditClick = (recipe: Recipe) => {
    setEditRecipe(recipe);
    setShowEditModal(true);
  };

  const handleEditRecipe = async (updatedData: Recipe) => {
    try {
      const token = localStorage.getItem('token');
      if (!token || !editRecipe) throw new Error('Not authenticated.');
      const res = await fetch(`http://localhost:5000/api/recipes/${editRecipe._id || editRecipe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to update recipe');
      }
      // Refetch recipes
      const userRes = await fetch('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      const recipesRes = await fetch(`http://localhost:5000/api/recipes/user/${userData._id}`);
      const recipesData = await recipesRes.json();
      setPublishedRecipes(recipesData);
      setShowEditModal(false);
      setEditRecipe(null);
    } catch (err: unknown) {
      let errorMsg = 'Failed to update recipe';
      if (err instanceof Error) errorMsg = err.message;
      alert(errorMsg);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated.');
      const res = await fetch(`http://localhost:5000/api/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to delete recipe');
      }
      // Refetch recipes
      const userRes = await fetch('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      const recipesRes = await fetch(`http://localhost:5000/api/recipes/user/${userData._id}`);
      const recipesData = await recipesRes.json();
      setPublishedRecipes(recipesData);
    } catch (err: unknown) {
      let errorMsg = 'Failed to delete recipe';
      if (err instanceof Error) errorMsg = err.message;
      alert(errorMsg);
    }
  };

  const userInitials = user ? (user.fullName?.split(' ').map((n: string) => n[0]).join('').toUpperCase()) : '';

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!user) return <div className="p-8 text-center">No user data.</div>;

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
              My Profile
            </h1>

            {/* Add Recipe Button */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2" 
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Recipe</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ fontFamily: 'Caveat, cursive' }}>
                {userInitials}
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {user.email}
              </p>
              <p className="text-sm text-gray-500 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Member since {user.joinedDate}
              </p>
              
              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: 'Caveat, cursive' }}>
                    {user.totalRecipes}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Published Recipes
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600" style={{ fontFamily: 'Caveat, cursive' }}>
                    {user.totalFavorites}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Favorite Recipes
                  </p>
                </div>
              </div>
            </div>
            
            {/* Settings Button */}
            <div className="flex-shrink-0">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <Settings className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => handleTabChange('favorites')}
                className={`py-4 px-6 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === 'favorites'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Favorite Recipes ({user.totalFavorites})</span>
                </div>
              </button>
              <button
                onClick={() => handleTabChange('published')}
                className={`py-4 px-6 border-b-2 font-semibold text-sm transition-colors ${
                  activeTab === 'published'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4" />
                  <span>My Recipes ({user.totalRecipes})</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          
          {/* Results Header */}
          <div className="mb-6">
            <p className="text-gray-600 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {currentRecipes.length} {activeTab === 'favorites' ? 'favorite' : 'published'} recipes
            </p>
          </div>

          {/* Empty State */}
          {currentRecipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                {activeTab === 'favorites' ? (
                  <Heart className="w-16 h-16 mx-auto mb-4" />
                ) : (
                  <ChefHat className="w-16 h-16 mx-auto mb-4" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2" style={{ fontFamily: 'Caveat, cursive' }}>
                {activeTab === 'favorites' ? 'No Favorites Yet' : 'No Recipes Published'}
              </h3>
              <p className="text-gray-500 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {activeTab === 'favorites'
                  ? 'Start exploring recipes and add them to your favorites!'
                  : 'Share your culinary creations with the community!'
                }
              </p>
              <Link
                href={activeTab === 'favorites' ? '/recipes' : '#'}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                style={{ fontFamily: 'Caveat, cursive' }}
              >
                {activeTab === 'favorites' ? 'Browse Recipes' : 'Add Your First Recipe'}
              </Link>
            </div>
          ) : (
            <>
              {/* Recipes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {displayRecipes.map((recipe) => (
                  <div key={recipe.id} className="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                      {activeTab === 'published' && (
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                            onClick={() => handleEditClick(recipe as Recipe)}
                            title="Edit Recipe"
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                            onClick={() => handleDeleteRecipe((recipe._id || recipe.id)?.toString() || '')}
                            title="Delete Recipe"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
                          {recipe.cuisine}
                        </span>
                        {recipe.diet !== 'none' && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            {recipe.diet}
                          </span>
                        )}
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
                              {typeof recipe.time === 'string' || typeof recipe.time === 'number' ? recipe.time : ''}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                              {recipe.calories} cal
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
                              className={`w-4 h-4 ${star <= Math.floor(Number(recipe.rating ?? 0)) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            ({recipe.rating ?? 0})
                          </span>
                        </div>
                        <Link
                          href={`/recipes/${String(recipe.id ?? recipe._id ?? '')}`}
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
            </>
          )}
        </div>
      </div>

      {/* Add Recipe Modal */}
      <AddRecipeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddRecipe}
      />

      {/* Edit Recipe Modal */}
      {showEditModal && (
        <AddRecipeModal
          isOpen={showEditModal}
          onClose={() => { setShowEditModal(false); setEditRecipe(null); }}
          onSubmit={handleEditRecipe}
          initialData={editRecipe}
        />
      )}
    </div>
  );
}
