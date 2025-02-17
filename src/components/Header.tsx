import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setFavorites, setResultsHidden } from '../features/favorites/favoritesSlice';
import ImageWithFallback from './ImageWithFallback';
import { HeaderProps, RecipeData } from '../types';

const Header: React.FC<HeaderProps> = ({ onSelectRecipe }) => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();
  const [isPanelActive, setIsPanelActive] = useState(false);

  useEffect(() => {
    const getFavorites = (): RecipeData[] => {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    };

    dispatch(setFavorites(getFavorites()));

    const handleStorageChange = () => {
      dispatch(setFavorites(getFavorites()));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  const handleLikesClick = () => {
    setIsPanelActive(!isPanelActive);
  };

  const handleFavoriteClick = (recipeId: string) => {
    onSelectRecipe(recipeId);
    dispatch(setResultsHidden(true)); // Adiciona a classe hidden-xs na div results
    setIsPanelActive(false); // Opcional: fecha o painel de favoritos após a seleção
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onSelectRecipe(''); // Passa um ID vazio ou uma lógica para resetar a seleção de receita
  };

  return (
    <header className="header">
      <a href="/" className="header__logo" onClick={handleLogoClick}>
        <img src="/logo.png" alt="Receitas Veganas" className="header__logo" />
      </a>
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
