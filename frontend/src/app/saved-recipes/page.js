'use client';

import { useState, useEffect } from 'react';
import styles from '../../styles/SavedRecipes.module.css';
import RecipeCard from '../../components/RecipeCard';

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // Load saved recipes from localStorage
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  const handleRemoveRecipe = (recipeId) => {
    const newSavedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    setSavedRecipes(newSavedRecipes);
    localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
  };

  const handleSaveRecipe = (recipe) => {
    // This is just a placeholder since we're in saved recipes
    console.log('Recipe already saved:', recipe);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Your Saved Recipes</h1>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className={styles.backButton}
        >
          ← Back to Dashboard
        </button>
      </header>

      <div className={styles.content}>
        {savedRecipes.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No saved recipes yet</h2>
            <p>Start exploring recipes and save your favorites!</p>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className={styles.exploreButton}
            >
              Explore Recipes
            </button>
          </div>
        ) : (
          <div className={styles.recipesGrid}>
            {savedRecipes.map(recipe => (
              <div key={recipe.id} className={styles.recipeWrapper}>
                <RecipeCard
                  recipe={recipe}
                  onSave={handleSaveRecipe}
                  isSaved={true}
                />
                <button 
                  onClick={() => handleRemoveRecipe(recipe.id)}
                  className={styles.removeButton}
                >
                  Remove from Saved
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
