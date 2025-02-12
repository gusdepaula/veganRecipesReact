import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';
import Loader from './Loader';
import { useLoader } from '../hooks/useLoader';

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
  const { setLoading } = useLoader();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      return new Promise<void>((resolve, reject) => {
        const recipeRef = ref(db, 'data');
        onValue(recipeRef, snapshot => {
          const data = snapshot.val();
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

    getRecipe()
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [recipeId, setLoading]);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some((fav: RecipeData) => fav.id === recipeId));
  }, [recipeId]);

  const handleFavoriteClick = () => {
    if (recipe) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isFavorite = favorites.some((fav: RecipeData) => fav.id === recipe.id);

      if (isFavorite) {
        const updatedFavorites = favorites.filter((fav: RecipeData) => fav.id !== recipe.id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        console.log('Receita removida dos favoritos:', recipe);
        setIsFavorite(false);
        alert('Receita removida dos favoritos!');
      } else {
        favorites.push(recipe);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Receita adicionada aos favoritos:', recipe);
        setIsFavorite(true);
        alert('Receita adicionada aos favoritos!');
      }
    }
  };

  const getFavorites = (): RecipeData[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  };

  useEffect(() => {
    const favorites = getFavorites();
    console.log('Lista de favoritos:', favorites);
  }, []);

  if (!recipe) return <Loader />;

  return (
    <div className="recipe">
      <figure className="recipe__fig">
        <a href="/" className="btn visible-xs recipe__back">
          « voltar
        </a>
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
        <button className="recipe__love" onClick={handleFavoriteClick} aria-label="Adicionar aos favoritos">
          <svg className="header__likes">
            <use href={isFavorite ? '/icons.svg#icon-heart' : '/icons.svg#icon-heart-outlined'}></use>
          </svg>
        </button>
        <ul className="recipe__ingredient-list">
          {recipe.ingredients.map((ing, index) => {
            if (!ing) return null;
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
