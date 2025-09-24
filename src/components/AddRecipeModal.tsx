'use client';

import React from 'react';
import { X, Upload, Plus, Minus } from 'lucide-react';

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipeData: Record<string, unknown>) => void;
  initialData?: Record<string, unknown>;
}

const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset'; // Replace with your Cloudinary upload preset
const CLOUDINARY_CLOUD_NAME = 'your_cloud_name'; // Replace with your Cloudinary cloud name

export default function AddRecipeModal({ isOpen, onClose, onSubmit, initialData }: AddRecipeModalProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    image: '',
    prepTime: '',
    difficulty: 'easy',
    category: 'breakfast',
    cuisine: 'american',
    diet: 'none',
    serves: '',
    calories: '',
    ingredients: [''],
    instructions: ['']
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
        prepTime: typeof initialData.prepTime === 'number' || typeof initialData.prepTime === 'string' ? initialData.prepTime.toString() : '',
        serves: typeof initialData.serves === 'number' || typeof initialData.serves === 'string' ? initialData.serves.toString() : '',
        calories: typeof initialData.calories === 'number' || typeof initialData.calories === 'string' ? initialData.calories.toString() : '',
        ingredients: Array.isArray(initialData.ingredients) ? initialData.ingredients as string[] : [''],
        instructions: Array.isArray(initialData.instructions) ? initialData.instructions as string[] : [''],
        image: typeof initialData.image === 'string' ? initialData.image : '',
      });
      setImagePreview(typeof initialData.image === 'string' ? initialData.image : '');
    }
  }, [initialData, formData]);

  const categories = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'snack', label: 'Snacks' },
    { value: 'beverage', label: 'Beverages' }
  ];

  const cuisines = [
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'french', label: 'French' },
    { value: 'thai', label: 'Thai' },
    { value: 'greek', label: 'Greek' },
    { value: 'nordic', label: 'Nordic' },
    { value: 'modern', label: 'Modern' }
  ];

  const diets = [
    { value: 'none', label: 'No Restrictions' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'gluten-free', label: 'Gluten Free' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'ingredients' | 'instructions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'instructions', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || 'Image upload failed');
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await onSubmit(formData);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
            Add New Recipe
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recipe Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Recipe Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter recipe title..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your recipe..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Recipe Image *
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required={!imageFile}
                />
                {imagePreview && (
                  // <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
                  <img
                    src={imagePreview}
                    alt="Recipe Preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
              </div>
            </div>

            {/* Prep Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Prep Time (minutes) *
              </label>
              <input
                type="number"
                value={formData.prepTime}
                onChange={(e) => handleInputChange('prepTime', e.target.value)}
                placeholder="30"
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Serves */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Serves *
              </label>
              <input
                type="number"
                value={formData.serves}
                onChange={(e) => handleInputChange('serves', e.target.value)}
                placeholder="4"
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              />
            </div>

            {/* Calories */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Calories per Serving
              </label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) => handleInputChange('calories', e.target.value)}
                placeholder="250"
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Difficulty *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Cuisine *
              </label>
              <select
                value={formData.cuisine}
                onChange={(e) => handleInputChange('cuisine', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine.value} value={cuisine.value}>
                    {cuisine.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Diet */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Diet *
              </label>
              <select
                value={formData.diet}
                onChange={(e) => handleInputChange('diet', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                required
              >
                {diets.map((diet) => (
                  <option key={diet.value} value={diet.value}>
                    {diet.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Ingredients *
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required={index === 0}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('ingredients', index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('ingredients')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Instructions *
            </label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <div className="flex-shrink-0 w-8 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-semibold text-sm">
                  {index + 1}
                </div>
                <textarea
                  value={instruction}
                  onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  rows={2}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  required={index === 0}
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('instructions', index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('instructions')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Publish Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
