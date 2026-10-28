export const FAVOURITES_KEY = "favourite-photos";

export type FavouritesAction = {
  type: "TOGGLE_FAVOURITE";
  photoId: number;
};


const favouritesReducer = (state: number[], action: FavouritesAction): number[] => {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      return state.includes(action.photoId)
        ? state.filter((id) => id !== action.photoId)
        : [...state, action.photoId];
    default:
      return state;
  }
};

export const initFavourites = (): number[] => {
  try {
    const stored = localStorage.getItem(FAVOURITES_KEY);
    return stored ? (JSON.parse(stored) as number[]) : [];
  } catch {
    return [];
  }
};

export default favouritesReducer;
