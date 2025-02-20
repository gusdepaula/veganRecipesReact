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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [recipes] = useState<RecipeData[]>([]);
  const [isRecipeHidden, setIsRecipeHidden] = useState(true);

  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setIsRecipeHidden(false); // Remove a classe hidden-xs da div recipe
  };

  return (
    <Provider store={store}>
      <LoaderProvider>
        <div className="container">
          <Header onSelectRecipe={handleSelectRecipe} />
          <Results recipes={recipes} onSelectRecipe={handleSelectRecipe} />
          {selectedRecipeId && <Recipe recipeId={selectedRecipeId} isHidden={isRecipeHidden} setIsHidden={setIsRecipeHidden} />}
          <Footer />
          <ToastContainer />
        </div>
      </LoaderProvider>
    </Provider>
  );
}

export default App;
