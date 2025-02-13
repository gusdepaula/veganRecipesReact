import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';
import Loader from './Loader';
import { useLoader } from '../hooks/useLoader';
import ImageWithFallback from './ImageWithFallback';
import { RecipeData, ResultsProps } from '../types';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Results: React.FC<ResultsProps> = ({ onSelectRecipe }) => {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState<RecipeData[]>([]);
  const { setLoading } = useLoader();
  const [isHidden, setIsHidden] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    //console.log(`Search input: ${e.target.value}`);
  };

  const getResults = async (query: string): Promise<RecipeData[]> => {
    return new Promise((resolve, reject) => {
      const dataRef = ref(db);
      onValue(
        dataRef,
        snapshot => {
          const data = snapshot.val();
          console.log('Data from Firebase:', data);
          if (data) {
            const filteredQuery = data.data
              .map((item: RecipeData, index: number) => ({
                uniqueId: index.toString(), // Evita sobrescrever 'id'
                ...item,
              }))
              .filter((item: RecipeData) => item.title && item.title.toLowerCase().includes(query.toLowerCase()));

            if (filteredQuery.length === 0) {
              console.log(`No results found for query: ${query}`);
            }

            resolve(filteredQuery);
          } else {
            resolve([]);
          }
        },
        error => {
          reject(error);
        },
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(`Searching for: ${searchInput}`);
    setLoading(true);

    try {
      const results = await getResults(searchInput);
      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const limitRecipeTitle = (title: string, limit = 40) => {
    if (title.length > limit) {
      const newTitle: string[] = [];
      title.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newTitle.join(' ')}...`;
    }
    return title;
  };

  const handleRecipeClick = (recipeId: string) => {
    onSelectRecipe(recipeId);
    setIsHidden(true); // Esconde a lista de resultados no mobile
  };

  const renderRecipe = (recipe: RecipeData) => (
    <li key={recipe.id}>
      <a className="results__link" href={`#${recipe.id}`} onClick={() => handleRecipeClick(recipe.id)}>
        <figure className="results__fig">
          <ImageWithFallback src={recipe.image_url} alt={recipe.title} className="recipe__img" fallbackSrc="/image-default.webp" />
        </figure>
        <div className="results__data">
          <h4 className="results__name">{limitRecipeTitle(recipe.title)}</h4>
          <p className="results__author">{recipe.publisher}</p>
        </div>
      </a>
    </li>
  );

  const createButton = (page: number, type: string) => (
    <button
      className={`btn-inline results__btn--${type}`}
      data-goto={type === 'prev' ? page - 1 : page + 1}
      onClick={() => setCurrentPage(type === 'prev' ? page - 1 : page + 1)}
    >
      <span>Página {type === 'prev' ? page - 1 : page + 1}</span>
      <svg className="search__icon">
        <use href={`..//icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}`}></use>
      </svg>
    </button>
  );

  const renderButtons = (page: number, numResults: number, resPerPage: number) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
      button = createButton(page, 'next');
    } else if (page < pages) {
      button = (
        <>
          {createButton(page, 'prev')}
          {createButton(page, 'next')}
        </>
      );
    } else if (page === pages && pages > 1) {
      button = createButton(page, 'prev');
    }
    return button;
  };

  const renderResults = (recipes: RecipeData[], page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    return recipes.slice(start, end).map(renderRecipe);
  };

  return (
    <div className={`results ${isHidden ? 'hidden-xs' : ''}`}>
      <form className="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="search__field"
            placeholder="Pesquise por ingrediente ou receita..."
            value={searchInput}
            onChange={handleInputChange}
          />
          <span className="input-group-btn">
            <button className="btn search__btn" onClick={handleSubmit}>
              <svg className="search__icon">
                <use href="/icons.svg#icon-magnifying-glass"></use>
              </svg>
            </button>
          </span>
        </div>
      </form>
      <Loader />
      <ul className="results__list">{renderResults(searchResults, currentPage, resultsPerPage)}</ul>
      <div className="results__pages">{renderButtons(currentPage, searchResults.length, resultsPerPage)}</div>
    </div>
  );
};

export default Results;
