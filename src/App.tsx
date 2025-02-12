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

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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

  return (
    <div className="container">
      <Header />
      <Results recipes={recipes} />
      <Recipe />
      <Footer />
    </div>
  );
}

export default App;
