import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState, RecipeData } from '../../types/types';

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<RecipeData>) => {
      state.favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    setFavorites: (state, action: PayloadAction<RecipeData[]>) => {
      state.favorites = action.payload;
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
