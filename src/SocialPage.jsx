import { useEffect, useState } from 'react';
import axios from 'axios';

function SocialPage() {
  const [artworks, setArtworks] = useState([]); // Estado para almacenar las obras
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('https://back-redsocial-2.onrender.com/artworks');
        setArtworks(response.data); // Almacena las obras en el estado
      } catch (err) {
        setError(err.message); // Maneja el error
      } finally {
        setLoading(false); // Indica que la carga ha terminado
      }
    };

    fetchArtworks(); // Llama a la función para obtener las obras
  }, []); // Se ejecuta una vez al montar el componente

  if (loading) {
    return <p>Cargando obras murales 3...</p>; // Mensaje de carga
  }

  if (error) {
    return <p>Error al cargar las obras: {error}</p>; // Mensaje de error
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Red Social de Arte Mural</h1>
      <p>Aquí puedes ver las publicaciones y clasificaciones de las obras murales.</p>

      <div>
        <h2>Publicaciones recientes</h2>
        <ul>
          {artworks.map((artwork) => (
            <li key={artwork.id_artwork}>
              <strong>{artwork.artwork_title}</strong> - {artwork.description_artwork}
              {/* Aquí podrías agregar más información, como comentarios y calificaciones */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SocialPage;
