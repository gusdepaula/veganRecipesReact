export interface RecipeData {
  id: string;
  image_url: string;
  title: string;
  publisher: string;
  directions: string;
  ingredients: string[];
}

export interface RecipeProps {
  recipeId: string;
}

export interface ResultsProps {
  recipes: RecipeData[];
  onSelectRecipe: (recipeId: string) => void;
}

export interface HeaderProps {
  onSelectRecipe: (recipeId: string) => void;
}

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc: string;
}

export interface FavoritesState {
  favorites: RecipeData[];
}
