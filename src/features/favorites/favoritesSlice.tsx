import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecipeData } from '../../types';

interface FavoritesState {
  favorites: RecipeData[];
  isResultsHidden: boolean;
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  isResultsHidden: false,
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
    setResultsHidden: (state, action: PayloadAction<boolean>) => {
      state.isResultsHidden = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites, setResultsHidden } = favoritesSlice.actions;

export default favoritesSlice.reducer;
