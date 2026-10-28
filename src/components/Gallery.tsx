import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { Photo } from "../types";
import PhotoCard from "./PhotoCard";
import favouritesReducer, { FAVOURITES_KEY, initFavourites } from "../reducers/favouritesReducer";

interface GalleryProps {
  photos: Photo[];
}

function Gallery({ photos }: GalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [favouriteIds, dispatch] = useReducer(favouritesReducer, [], initFavourites);

  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleFavourite = useCallback((photoId: number) => {
    dispatch({ type: "TOGGLE_FAVOURITE", photoId });
  }, []);

  const filteredPhotos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(term));
  }, [photos, searchTerm]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-6">Photo Gallery</h1>
      <div className="flex justify-center items-center mt-10 gap-3">
        <label htmlFor="photo-search" className="text-lg font-semibold">
          Search
        </label>
        <input
          id="photo-search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Filter by author name"
          className="w-72 rounded-md border-2 border-black px-3 py-2 text-sm outline-none transition-colors focus:border-[#5139ac]"
        />
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          No photos found for &quot;{searchTerm}&quot;
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favouriteIds.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Gallery;
