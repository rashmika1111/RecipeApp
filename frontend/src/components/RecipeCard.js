// src/components/RecipeCard.js
"use client";

import { useState } from "react";
import styles from "../styles/RecipeCard.module.css";

export default function RecipeCard({ recipe, onSave, isSaved }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent} onClick={toggleDetails}>
        <img src={recipe.image} alt={recipe.title} className={styles.image} />
        <h3 className={styles.title}>{recipe.title}</h3>
      </div>

      {showDetails && (
        <div className={styles.detailsPopup}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} className={styles.detailImage} />
          <p>{recipe.description}</p>
          <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>

          <div className={styles.actions}>
            <button onClick={() => onSave(recipe)} disabled={isSaved}>
              {isSaved ? "Saved" : "Save Recipe"}
            </button>
            <button onClick={toggleDetails} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
