import { useEffect, useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import firebaseConfig from './firebaseConfig';
import Header from './components/Header';
import Results from './components/Results';
import Recipe from './components/Recipe';
import Footer from './components/Footer';

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

interface Recipe {
  id: string;
  image_url: string;
  title: string;
  publisher: string;
  ingredients: { count: number; unit: string; ingredient: string }[];
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  useEffect(() => {
    const dbRef = ref(db);
    get(dbRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  return (
    <div className="container">
      <Header />
      <Results recipes={recipes} onSelectRecipe={handleSelectRecipe} />
      {selectedRecipeId && <Recipe recipeId={selectedRecipeId} />}
      <Footer />
    </div>
  );
}

export default App;
