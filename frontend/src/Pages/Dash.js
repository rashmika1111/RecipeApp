'use client';

import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Dash.module.css';

export default function Dash() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    
    async function fetchCategories() {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();

        const formatted = (data.categories || []).map((cat) => ({
          id: cat.idCategory,
          title: cat.strCategory,
          image: cat.strCategoryThumb,
          description: cat.strCategoryDescription,
          cookTime: "N/A",
          difficulty: "N/A"
        }));

        setRecipes(formatted);
        setFilteredRecipes(formatted);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchCategories();

    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleSaveRecipe = (recipe) => {
    const isAlreadySaved = savedRecipes.some(saved => saved.id === recipe.id);
    
    if (!isAlreadySaved) {
      const newSavedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
      alert('Recipe saved to your list!');
    } else {
      alert('This recipe is already in your saved list!');
    }
  };

  const handleRemoveRecipe = (recipeId) => {
    const newSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Recipe Dashboard</h1>
        <div className={styles.navButtons}>
          <button 
            onClick={() => window.location.href = '/saved-recipes'}
            className={styles.navButton}
          >
            View Saved Recipes ({savedRecipes.length})
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <SearchBar onSearch={handleSearch} />
        
        <div className={styles.recipesGrid}>
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSave={handleSaveRecipe}
              isSaved={savedRecipes.some(saved => saved.id === recipe.id)}
            />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className={styles.noResults}>
            <p>No recipes found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
