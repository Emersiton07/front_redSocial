import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SocialPage from './SocialPage'; // Importar la página de red social

function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const tunjaMarkers = [
    {
      id: 1,
      name: 'Plaza de Bolívar',
      description: 'La principal plaza pública de Tunja.',
      latitude: 5.5353,
      longitude: -73.3577,
    },
    {
      id: 2,
      name: 'Catedral Basílica Metropolitana Santiago de Tunja',
      description: 'Catedral histórica en Tunja.',
      latitude: 5.5351,
      longitude: -73.3579,
    },
    {
      id: 3,
      name: 'Puente de Boyacá',
      description: 'Lugar histórico donde se libró la Batalla de Boyacá.',
      latitude: 5.4545,
      longitude: -73.3619,
    },
  ];

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <Router>
      <Routes>
        {/* Página principal con el mapa */}
        <Route
          path="/"
          element={
            <div style={{ height: '100vh' }}>
              {/* Área superior para botones */}
              <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                <Link to="/social">
                  <button>Botón 1</button>
                </Link>
                <button onClick={() => alert('Botón 2')}>Botón 2</button>
              </div>

              {/* Contenedor para mapa y panel de información */}
              <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
                {/* Panel de información del marcador */}
                <div
                  style={{
                    width: '40%', // Panel a la izquierda
                    height: '100%',
                    backgroundColor: 'black',
                    padding: '20px',
                    border: '1px solid #ddd',
                    overflowY: 'auto',
                  }}
                >
                  {selectedMarker ? (
                    <div>
                      <h2>{selectedMarker.name}</h2>
                      <p>{selectedMarker.description}</p>
                      <p>
                        Coordenadas: Latitud {selectedMarker.latitude}, Longitud {selectedMarker.longitude}
                      </p>
                    </div>
                  ) : (
                    <p>Haz clic en un marcador para ver la información.</p>
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
                    style={{ width: '600%', height: '100%' }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken="pk.eyJ1IjoiZW1lcnNvbjA3IiwiYSI6ImNsd3B2MWhyejF0YmYya3Jpc25vaHkzeWoifQ.3EyxjqBmu8jI1s6TU3kpQg"
                  >
                    {tunjaMarkers.map((marker) => (
                      <Marker
                        key={marker.id}
                        latitude={marker.latitude}
                        longitude={marker.longitude}
                        onClick={() => handleMarkerClick(marker)}
                      />
                    ))}
                  </Map>
                </div>
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
