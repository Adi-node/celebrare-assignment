import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [photos,setPhotos] = useState([]);

  useEffect(()=>{
    async function fetchPhotos (){
      const response =await fetch("https://picsum.photos/v2/list?limit=30");
      const data = await response.json();

      setPhotos(data);
    }

    fetchPhotos();
    
  },[])
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-6'>
        {photos.map((photo)=>(
          <img key={photo.id} src={photo.download_url} alt="Photo not found..."
          className='w-full h-auto object-cover rounded-xl shadow-md place-self-center transition-transform duration-300 hover:scale-105' />
        ))}
      </div>
    </>
  )
}

export default App
