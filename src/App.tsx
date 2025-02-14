import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Results from './components/Results';
import Recipe from './components/Recipe';
import Footer from './components/Footer';
import { LoaderProvider } from './hooks/useLoader';
import { RecipeData } from './types';
import { Provider } from 'react-redux'; // Importe o Provider
import store from './store'; // Importe a sua store

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [recipes] = useState<RecipeData[]>([]);

  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  return (
    <Provider store={store}>
      <LoaderProvider>
        <div className="container">
          <Header onSelectRecipe={handleSelectRecipe} />
          <Results recipes={recipes} onSelectRecipe={handleSelectRecipe} />
          {selectedRecipeId && <Recipe recipeId={selectedRecipeId} />}
          <Footer />
        </div>
      </LoaderProvider>
    </Provider>
  );
}

export default App;
