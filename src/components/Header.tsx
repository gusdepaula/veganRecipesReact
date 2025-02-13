import { useState, useEffect } from 'react';
import ImageWithFallback from './ImageWithFallback';

interface RecipeData {
  id: string;
  image_url: string;
  title: string;
  publisher: string;
}

interface HeaderProps {
  onSelectRecipe: (recipeId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectRecipe }) => {
  const [favorites, setFavorites] = useState<RecipeData[]>([]);
  const [isPanelActive, setIsPanelActive] = useState(false);

  useEffect(() => {
    const getFavorites = (): RecipeData[] => {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    };

    setFavorites(getFavorites());

    const handleStorageChange = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLikesClick = () => {
    setIsPanelActive(!isPanelActive);
  };

  const handleFavoriteClick = (recipeId: string) => {
    onSelectRecipe(recipeId);
    setIsPanelActive(false); // Opcional: fecha o painel de favoritos após a seleção
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
