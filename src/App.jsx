import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SocialPage from './SocialPage'; // Importar la página de red social
import Avatar from '@mui/material/Avatar'; // Material UI Avatar para el componente

function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    rating: 'all',
  });

  const tunjaMarkers = [
    {
      id: 1,
      name: 'Plaza de Bolívar',
      description: 'La principal plaza pública de Tunja.',
      latitude: 5.5353,
      longitude: -73.3577,
      category: 'historical',
      rating: 5,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Tunja_centro_historico7.jpg',
    },
    {
      id: 2,
      name: 'Catedral Basílica Metropolitana Santiago de Tunja',
      description: 'Catedral histórica en Tunja.',
      latitude: 5.5351,
      longitude: -73.3579,
      category: 'religious',
      rating: 4,
      imageUrl: 'https://example.com/catedral-tunja.jpg',
    },
    {
      id: 3,
      name: 'Puente de Boyacá',
      description: 'Lugar histórico donde se libró la Batalla de Boyacá.',
      latitude: 5.4545,
      longitude: -73.3619,
      category: 'historical',
      rating: 5,
      imageUrl: 'https://example.com/puente-boyaca.jpg',
    },
  ];

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredMarkers = tunjaMarkers.filter((marker) => {
    return (
      (filters.category === 'all' || marker.category === filters.category) &&
      (filters.rating === 'all' || marker.rating >= parseInt(filters.rating))
    );
  });

  const handleAvatarClick = () => {
    if (selectedMarker) {
      alert(`Acción realizada sobre la obra: ${selectedMarker.name}`);
      // Puedes agregar aquí la lógica adicional, como abrir un modal, etc.
    } else {
      alert('Selecciona una obra primero.');
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ height: '100vh', position: 'relative' }}>
              {/* Área superior para botones */}
              <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                <Link to="/social">
                  <button>Botón 1</button>
                </Link>
                <button onClick={() => alert('Botón 2')}>Botón 2</button>
              </div>

              {/* Contenedor para mapa, panel de información y filtros */}
              <div style={{ display: 'flex', height: 'calc(100vh - 60px)', width: '100vw' }}>
                {/* Panel de información del marcador */}
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  {selectedMarker ? (
    <>
      <a href="#">
        <img className="rounded-t-lg" src={selectedMarker.imageUrl} alt={selectedMarker.name} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {selectedMarker.name} </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{selectedMarker.description}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{selectedMarker.category}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{selectedMarker.rating}</p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
    </>
  ) : (
    <div className="p-5 text-gray-500">
      <p>No hay marcador seleccionado. Haz clic en un marcador en el mapa para ver más información.</p>
    </div>
  )}
</div>

                {/* Mapa de Mapbox */}
                <div style={{ width: '60%', height: '100%' }}>
                  <Map
                    initialViewState={{
                      latitude: 5.5353,
                      longitude: -73.3577,
                      zoom: 13,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken="pk.eyJ1IjoiZW1lcnNvbjA3IiwiYSI6ImNsd3B2MWhyejF0YmYya3Jpc25vaHkzeWoifQ.3EyxjqBmu8jI1s6TU3kpQg"
                  >
                    {filteredMarkers.map((marker) => (
                      <Marker
                        key={marker.id}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        onClick={() => handleMarkerClick(marker)}
                      />
                    ))}
                  </Map>
                </div>

                {/* Panel de filtros */}
                <div
                  style={{
                    width: '20%',
                    height: '100%',
                    padding: '20px',
                    backgroundColor: 'black',
                    border: '1px solid #ddd',
                    overflowY: 'auto',
                  }}
                >
                  <h3>Filtros</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="category">Categoría:</label>
                    <select
                      id="category"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      style={{ display: 'block', width: '100%', marginTop: '10px' }}
                    >
                      <option value="all">Todas</option>
                      <option value="historical">Histórico</option>
                      <option value="religious">Religioso</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="rating">Calificación mínima:</label>
                    <select
                      id="rating"
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                      style={{ display: 'block', width: '100%', marginTop: '10px' }}
                    >
                      <option value="all">Todas</option>
                      <option value="5">5 estrellas</option>
                      <option value="4">4 estrellas o más</option>
                      <option value="3">3 estrellas o más</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Avatar en la esquina inferior derecha */}
              <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b88c2eec-ec74-42b5-97ce-526979054230/d4ttuhp-85cedfc5-62bf-4d9b-817e-dc65b58d0c53.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4OGMyZWVjLWVjNzQtNDJiNS05N2NlLTUyNjk3OTA1NDIzMFwvZDR0dHVocC04NWNlZGZjNS02MmJmLTRkOWItODE3ZS1kYzY1YjU4ZDBjNTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8XYBTwyc0TFXRE-cUbDuE0klXlIVgCbsNmIiioSj2UU" // URL de la imagen del avatar
                  sx={{ width: 56, height: 56, cursor: 'pointer' }}
                  onClick={handleAvatarClick}
                />
              </div>
            </div>
          }
        />
        {/* Ruta para la página de la red social */}
        <Route path="/social" element={<SocialPage />} />
      </Routes>
    </Router>
  );
}

export default App;
