import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';

interface RecipeData {
  id: string;
  image_url: string;
  title: string;
  publisher: string;
  directions: string;
  ingredients: string[];
}

interface RecipeProps {
  recipeId: string;
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Recipe: React.FC<RecipeProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      return new Promise<void>((resolve, reject) => {
        const recipeRef = ref(db, 'data');
        onValue(recipeRef, snapshot => {
          const data = snapshot.val();
          //console.log('Data from Firebase:', data); // Adicionando log para verificar os dados
          if (data) {
            const filteredId = data.filter((item: RecipeData) => item.id === recipeId);
            if (filteredId.length > 0) {
              setRecipe(filteredId[0]);
              resolve();
            } else {
              reject('Recipe not found');
            }
          } else {
            reject('No data available');
          }
        });
      });
    };

    getRecipe().catch(error => console.error(error));
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

  //console.log('Recipe data:', recipe); // Adicionando log para verificar os dados da receita

  return (
    <div className="recipe">
      <figure className="recipe__fig">
        <img src={recipe.image_url} alt={recipe.title} className="recipe__img" />
        <h1 className="recipe__title">
          <span>{recipe.title}</span>
        </h1>
      </figure>
      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">45</span>
          <span className="recipe__info-text"> minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--people">4</span>
          <span className="recipe__info-text"> servings</span>
        </div>
      </div>
      <div className="recipe__ingredients">
        <ul className="recipe__ingredient-list">
          {recipe.ingredients.map((ing, index) => {
            if (!ing) return null; // Verificação para ignorar ingredientes vazios
            //console.log('Ingredient:', ing); // Adicionando log para verificar os dados dos ingredientes
            return (
              <li key={index} className="recipe__item">
                <svg className="recipe__icon">
                  <use href="/icons.svg#icon-check"></use>
                </svg>
                <div className="recipe__ingredient">{ing}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="recipe__directions">
        <h2 className="heading-2">Modo de preparo</h2>
        <p className="recipe__directions-text" dangerouslySetInnerHTML={{ __html: recipe.directions }} />
      </div>
    </div>
  );
};

export default Recipe;
