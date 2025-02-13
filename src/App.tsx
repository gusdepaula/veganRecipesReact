import { useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import firebaseConfig from './firebaseConfig';
import Header from './components/Header';
import Results from './components/Results';
import Recipe from './components/Recipe';
import Footer from './components/Footer';
import { LoaderProvider } from './hooks/useLoader';
import { RecipeData } from './types';

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [recipes] = useState<RecipeData[]>([]);

  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  return (
    <LoaderProvider>
      <div className="container">
        <Header onSelectRecipe={handleSelectRecipe} />
        <Results recipes={recipes} onSelectRecipe={handleSelectRecipe} />
        {selectedRecipeId && <Recipe recipeId={selectedRecipeId} />}
        <Footer />
      </div>
    </LoaderProvider>
  );
}

export default App;
