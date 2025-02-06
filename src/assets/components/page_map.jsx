import '../css/page_map.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Carousel } from 'antd';
const { Meta } = Card;
import SocialPage from './SocialPage'; // Importar la página de red social
import { Source, Layer } from 'react-map-gl';

function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [filters, setFilters] = useState({
    promedio_calificaciones: 'all',
  });
  const [obras, setObras] = useState([]); // Aquí guardaremos las obras obtenidas desde el backend
  const [selectedObras, setSelectedObras] = useState([]);
  const [routeData, setRouteData] = useState(null);
  const [isRoutePanelOpen, setIsRoutePanelOpen] = useState(false);




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

  const handleSelectObra = (obra) => {
    setSelectedObras((prev) => {
      const alreadySelected = prev.find((o) => o._id === obra._id);
      if (alreadySelected) {
        return prev.filter((o) => o._id !== obra._id);
      } else {
        return [...prev, obra];
      }
    });
  };



  const getRoute = () => {
    if (selectedObras.length < 2) {
      alert('Selecciona al menos dos obras para generar una ruta.');
      return;
    }

    const coordinates = selectedObras.map((obra) => [
      obra.ubicacion.longitud,
      obra.ubicacion.latitud,
    ]);

    setRouteData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates,
          },
        },
      ],
    });
  };



  const filteredMarkers = obras.filter((marker) => {
    return (
      (filters.promedio_calificaciones === 'all' || marker.promedio_calificaciones.toString() >= filters.promedio_calificaciones)
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


              <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MAPA</span>
                  </a>
                  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesión</button>
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                      <span className="sr-only">Open main menu</span>
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                      </svg>
                    </button>
                  </div>
                  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                      <li>
                        <a href="#" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500" aria-current="page">Red Social</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Nueva Obra</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Galeria</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contacto</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>


              {/* Contenedor para mapa, panel de información y filtros */}

              <div
                style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                {/* Panel de información del marcador */}
                <Card
                  className="rounded-sm"
                  style={{ width: 300 }}
                  cover={
                    selectedMarker && selectedMarker.imagenes?.length > 0 ? (
                      <Carousel autoplay>
                        {selectedMarker.imagenes.map((imgUrl, index) => (
                          <img
                            key={index}
                            alt={selectedMarker.nombre || `Imagen ${index + 1}`}
                            src={imgUrl}
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                          />
                        ))}
                      </Carousel>
                    ) : (
                      <img
                        alt="placeholder"
                        src="https://via.placeholder.com/300"
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      />
                    )
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  {selectedMarker ? (
                    <Meta
                      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                      title={selectedMarker.nombre || 'Sin nombre'}
                      description={selectedMarker.descripcion || 'Sin descripción disponible'}
                    />
                  ) : (
                    <div style={{ color: 'gray', padding: '10px' }}>
                      <p>No hay marcador seleccionado. Haz clic en un marcador en el mapa para ver más información.</p>
                    </div>
                  )}
                </Card>




                {/* Mapa de Mapbox */}
                <div style={{ flex: 1, height: '100%' }}>
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
                    {routeData && (
                      <Source id="route" type="geojson" data={routeData}>
                        <Layer
                          id="routeLayer"
                          type="line"
                          paint={{
                            "line-color": "#ff0000",
                            "line-width": 4,
                          }}
                        />
                      </Source>
                    )}



                  </Map>
                </div>

                {/* Panel de filtros */}
                <div
                  className='overflow-auto'
                  style={{
                    width: '20%',
                    height: '100%',
                    padding: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    overflowY: 'auto',
                  }}
                >
                  <h3>Filtros</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filtro Por Decidir:</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    <label htmlFor="promedio_calificaciones" className="block mb-2 text-sm font-medium text-gray-900 dark:text-Black">Calificación mínima:</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="promedio_calificaciones"
                      name="promedio_calificaciones"
                      value={filters.promedio_calificaciones}
                      onChange={handleFilterChange}
                      style={{ display: 'block', width: '100%', marginTop: '10px' }}
                    >
                      <option value="all">Todas</option>
                      <option value="5">5 estrellas</option>
                      <option value="4">4 estrellas o más</option>
                      <option value="3">3 estrellas o más</option>
                    </select>
                  </div>
                  {/* Botón para abrir/cerrar el panel de selección de obras */}
                  <button
                    onClick={() => setIsRoutePanelOpen(!isRoutePanelOpen)}
                    className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {isRoutePanelOpen ? "Cerrar Panel de Rutas" : "Seleccionar Obras"}
                    
                  </button>
                </div>

                {/* Panel de selección de obras */}
                {isRoutePanelOpen && (
                  <div className="absolute top-16 left-4 bg-white p-4 shadow-lg rounded-lg w-64 max-h-96 overflow-auto">
                    <h3 className="text-lg font-semibold">Seleccionar Obras</h3>
                    {obras.map((obra) => (
                      <div key={obra._id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedObras.some((o) => o._id === obra._id)}
                          onChange={() => handleSelectObra(obra)}
                        />
                        <label>{obra.nombre || "Obra sin nombre"}</label>
                      </div>
                    ))}
                    <button
                      onClick={getRoute}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full"
                    >
                      Generar Ruta
                    </button>
                  </div>
                )}
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
