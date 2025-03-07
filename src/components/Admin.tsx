import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Importe a configuração do Firebase
import { ref, push, set } from 'firebase/database'; // Ou use Firestore se preferir
import { RecipeData } from '../types';
import { toast, ToastContainer } from 'react-toastify';

const Admin: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeData>({
    id: '',
    image_url: '',
    title: '',
    publisher: '',
    directions: '',
    ingredients: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: value.split(',').map(ing => ing.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newRecipeRef = push(ref(db, 'data'));
      await set(newRecipeRef, {
        ...recipe,
        id: newRecipeRef.key,
      });
      toast.success('Receita cadastrada com sucesso!');
      setRecipe({
        id: '',
        image_url: '',
        title: '',
        publisher: '',
        directions: '',
        ingredients: [],
      });
    } catch (error) {
      console.error('Erro ao cadastrar receita:', error);
      toast.error('Erro ao cadastrar receita. Tente novamente.');
    }
  };

  return (
    <div className="admin">
      <h2>Cadastrar Receita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" value={recipe.title} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="image_url">URL da Imagem</label>
          <input type="text" id="image_url" name="image_url" value={recipe.image_url} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="publisher">Publicador</label>
          <input type="text" id="publisher" name="publisher" value={recipe.publisher} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="directions">Modo de Preparo</label>
          <textarea id="directions" name="directions" value={recipe.directions} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredientes (separados por vírgula)</label>
          <textarea id="ingredients" name="ingredients" value={recipe.ingredients.join(', ')} onChange={handleIngredientsChange} required />
        </div>
        <button type="submit">Cadastrar Receita</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Admin;
