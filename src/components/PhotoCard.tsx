import type { Photo } from "../types";

interface PhotoCardProps {
  photo: Photo;
  isFavourite: boolean;
  onToggleFavourite: (photoId: number) => void;
}

function PhotoCard({ photo, isFavourite, onToggleFavourite }: PhotoCardProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md">
      <div className="relative w-full">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-auto object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition-colors duration-200 ${
              isFavourite ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-500"
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
      <p className="mt-3 text-center text-sm font-medium text-gray-700">Author: {photo.author}</p>
    </div>
  );
}

export default PhotoCard;
