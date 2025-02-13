import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Importe os hooks
import { RootState } from '../store'; // Importe o tipo RootState
import { setFavorites } from '../features/favorites/favoritesSlice'; // Importe a action
import ImageWithFallback from './ImageWithFallback';
import { RecipeData, HeaderProps } from '../types/types';

const Header: React.FC<HeaderProps> = ({ onSelectRecipe }) => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites); // Acesse o estado do Redux
  const dispatch = useDispatch(); // Obtenha a função dispatch
  const [isPanelActive, setIsPanelActive] = useState(false);

  useEffect(() => {
    const getFavorites = (): RecipeData[] => {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    };

    dispatch(setFavorites(getFavorites())); // Use dispatch para atualizar o estado do Redux

    const handleStorageChange = () => {
      dispatch(setFavorites(getFavorites())); // Use dispatch para atualizar o estado do Redux
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]); // Adicione dispatch como dependência

  const handleLikesClick = () => {
    setIsPanelActive(!isPanelActive);
  };

  const handleFavoriteClick = (recipeId: string) => {
    onSelectRecipe(recipeId);
    setIsPanelActive(false);
  };

  return (
    <header className="header">
      <img src="/logo.png" alt="Logo" className="header__logo" />
      <div className="likes" onClick={handleLikesClick}>
        <div className="likes__field" style={{ visibility: favorites.length > 0 ? 'visible' : 'hidden' }}>
          <svg className="likes__icon">
            <use href="/icons.svg#icon-heart"></use>
          </svg>
        </div>
        <div className={`likes__panel ${isPanelActive ? 'likes__panel-active' : ''}`}>
          <ul className="likes__list">
            {favorites.map(favorite => (
              <li key={favorite.id}>
                <a href={`#${favorite.id}`} className="likes__link" onClick={() => handleFavoriteClick(favorite.id)}>
                  <figure className="likes__fig">
                    <ImageWithFallback
                      src={favorite.image_url}
                      alt={favorite.title}
                      className="recipe__img"
                      fallbackSrc="/image-default.webp"
                    />
                  </figure>
                  <div className="likes__data">
                    <h4 className="likes__name">{favorite.title}</h4>
                    <p className="likes__author">{favorite.publisher}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
