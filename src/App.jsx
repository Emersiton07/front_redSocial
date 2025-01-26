import './App.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
import SocialPage from './SocialPage'; // Importar la página de red social

function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filters, setFilters] = useState({
    promedio_calificaciones: 'all',
  });
  const [obras, setObras] = useState([]); // Aquí guardaremos las obras obtenidas desde el backend

  useEffect(() => {
    // Hacer la solicitud para obtener las obras desde el backend
    axios.get('http://localhost:3000/obras/obtenerObras')
      .then((response) => {
        setObras(response.data); // Guardar las obras en el estado
        console.log('obras obtenidas', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las obras:', error);
      });
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredMarkers = obras.filter((marker) => {
    return (
      (filters.promedio_calificaciones === 'all' || marker.promedio_calificaciones.toString() === filters.promedio_calificaciones)
      //&& (filters.rating === 'all' || marker.rating >= parseInt(filters.rating))
    );
  });

  const handleAvatarClick = () => {
    if (selectedMarker) {
      alert(`Acción realizada sobre la obra: ${selectedMarker.name}`);
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
                <button onClick={() => alert('Botón 2')}>boton 2</button>
                <p></p>
              </div>

              {/* Contenedor para mapa, panel de información y filtros */}

              <div
                style={{ display: 'flex', height: 'calc(100vh - 60px)', width: '100vw' }}>
                {/* Panel de información del marcador */}
                <Card className="rounded-sm"
                  style={{
                    width: 300,
                  }}
                  cover={
                    selectedMarker ? (
                      <img
                        alt="{selectedMarker.nombre}"
                        src={selectedMarker.imagenes || 'https://via.placeholder.com/300'}
                      />
                    ) : (
                      <img
                        alt="placeholder"
                        src="https://via.placeholder.com/300"
                      />
                    )
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  {selectedMarker ? (<Meta

                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={selectedMarker.nombre || 'Sin nombre'}
                    description={selectedMarker.descripcion || 'Sin descripción disponible'}
                  />) : (
                    <div style={{ color: 'gray', padding: '10px' }}>
                      <p>No hay marcador seleccionado. Haz clic en un marcador en el mapa para ver más información.</p>
                    </div>
                  )}

                </Card>




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
                    mapboxAccessToken="pk.eyJ1IjoiZW1lcnNvbjA3IiwiYSI6ImNtNmNtM3IxczBrc3gyanE0aGN1eTlmOWYifQ.jw_Yp6JZCKeMeq0zEDzvmg"
                  >
                    {filteredMarkers.map((marker) => {

                      const lat = marker.ubicacion.latitud;
                      const lon = marker.ubicacion.longitud;
                      console.log("AQUI", lat); // Esto te ayuda a verificar si _id está presente
                      console.log("AQUI 2", lon);
                      if (!isNaN(lat) && !isNaN(lon)) {
                        return (
                          <Marker
                            key={marker._id}
                            latitude={lat}
                            longitude={lon}
                            onClick={() => handleMarkerClick(marker)}
                            offsetTop={-30}
                          />
                        );

                      } else {
                        console.error("Latitud o Longitud inválidas:", marker.ubicacion);
                        return null;
                      }
                    })}


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
                    <select className="w-full bg-transparent placeholder:text-red-400 text-red-700 text-sm border border-red-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-red-500 hover:border-red-300 shadow-sm focus:shadow appearance-none cursor-pointer"
                      id="calificacion2"
                      name="calificacion2"
                      value={filters.calificacion2}
                      onChange={handleFilterChange}

                      style={{ display: 'block', width: '100%', marginTop: '10px' }}
                    >
                      <option value="all">Todas</option>
                      <option value="historical">Histórico</option>
                      <option value="religious">Religioso</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="promedio_calificaciones">Calificación mínima:</label>
                    <select className="w-full bg-transparent placeholder:text-red-400 text-red-700 text-sm border border-red-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-red-500 hover:border-red-300 shadow-sm focus:shadow appearance-none cursor-pointer"
                      id="promedio_calificaciones"
                      name="promedio_calificaciones"
                      value={filters.promedio_calificaciones}
                      onChange={handleFilterChange}
                      style={{ display: 'block', width: '100%', marginTop: '10px' }}
                    >
                      <option value="all">Todas</option>
                      <option value="5">5 estrellas</option>
                      <option value="4.5">4 estrellas o más</option>
                      <option value="3">3 estrellas o más</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Avatar en la esquina inferior derecha */}
              <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://example.com/avatar.png"
                  sx={{ width: 56, height: 56, cursor: 'pointer' }}
                  onClick={handleAvatarClick}
                />
              </div>
            </div>
          }
        />
        <Route path="/social" element={<SocialPage />} />
      </Routes>
    </Router>
  );
}

export default App;
