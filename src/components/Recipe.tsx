import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';
import Loader from './Loader';
import { useLoader } from '../hooks/useLoader';
import ImageWithFallback from './ImageWithFallback';
import { RecipeData, RecipeProps } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addFavorite, removeFavorite } from '../features/favorites/favoritesSlice';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Recipe: React.FC<RecipeProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const { setLoading } = useLoader();
  const dispatch = useDispatch(); // Obtenha a função dispatch
  const favorites = useSelector((state: RootState) => state.favorites.favorites); // Acesse o estado de favoritos do Redux
  const isFavorite = favorites.some((fav: RecipeData) => fav.id === recipeId); // Verifique se a receita está nos favoritos

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

  const handleFavoriteClick = () => {
    if (recipe) {
      if (isFavorite) {
        dispatch(removeFavorite(recipe.id)); // Dispatch a action para remover dos favoritos
        alert('Receita removida dos favoritos!');
      } else {
        dispatch(addFavorite(recipe)); // Dispatch a action para adicionar aos favoritos
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
          <svg>
            <use href="/icons.svg#icon-triangle-left"></use>
          </svg>{' '}
          voltar
        </a>
        <ImageWithFallback src={recipe.image_url} alt={recipe.title} className="recipe__img" fallbackSrc="/image-default.webp" />
        <h1 className="recipe__title">
          <span>{recipe.title}</span>
        </h1>
      </figure>
      <div className="recipe__ingredients">
        <button className="recipe__love" onClick={handleFavoriteClick} aria-label="Adicionar aos favoritos">
          <svg className="header__likes">
            <use href={isFavorite ? '/icons.svg#icon-heart' : '/icons.svg#icon-heart-outlined'}></use>
          </svg>
        </button>
        <h2 className="heading-2">Ingredientes</h2>
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
        <p className="recipe__directions-text">
          Esta receita foi cuidadosamente desenvolvida e testada por <span className="recipe__by">{recipe.publisher}</span>.
        </p>
      </div>
    </div>
  );
};

export default Recipe;
