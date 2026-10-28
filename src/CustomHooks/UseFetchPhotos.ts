import { useEffect, useState } from "react";
import type { Photo } from "../types";

interface UseFetchPhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const useFetchPhotos = (): UseFetchPhotosResult => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch("https://picsum.photos/v2/list?limit=30");
        if (!response.ok) {
          throw new Error(`Failed to fetch photos (status ${response.status})`);
        }
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong while fetching photos."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};

export default useFetchPhotos;
