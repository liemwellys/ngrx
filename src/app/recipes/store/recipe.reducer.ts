import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State ={
  recipes: []
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload], 
      };

    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    
    case RecipesActions.UPDATE_RECIPE:
      /** overwrite to update a recipe by  
       * copy the old recipe using spread operator 
       * & merge with new recipe
       */
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };

      // copy the whole recipes into updatedRecipes
      const updatedRecipes = [...state.recipes];

      // replace the updatedRecipes choosen index
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };

    case RecipesActions.DELETE_RECIPE:
      /** return a new list by using filter() 
       * filter give access to each element & index of an array
       */
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          // return element which index is not specified on payload 
          return index !== action.payload;
        })
      };
    
    default:
      return state;
  }
}
