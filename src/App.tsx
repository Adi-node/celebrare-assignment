import useFetchPhotos from './CustomHooks/UseFetchPhotos';
import Gallery from './components/Gallery';

function App() {
  const { photos, loading, error } = useFetchPhotos();

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div className="w-16 h-16 border-4 border-black/40 border-t-[#5139ac] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center mt-10 px-4">
        <div className="rounded-lg border-2 border-red-400 bg-red-50 px-6 py-4 text-red-600 font-medium">
          Error loading photos. {error}
        </div>
      </div>
    );
  }

  return <Gallery photos={photos} />;
}

export default App
