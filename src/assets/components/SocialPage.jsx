import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Button, Carousel } from "antd";

export default function SocialPage() {
  const [obras, setObras] = useState([]);
  const [obraSeleccionada, setObraSeleccionada] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    axios.get('https://back-redsocial-3.onrender.com/obras/obtenerObras')
      .then((response) => {
        setObras(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las obras:', error);
      });
  }, []);

  const agregarComentario = async () => {
    if (obraSeleccionada && nuevoComentario.trim() !== "") {
      const comentarioData = {
        obra_id: obraSeleccionada._id,
        usuario_id: "67abdee7d9ebad657138245f",  // Esto debería ser dinámico si tienes un usuario autenticado
        nombre_usuario: "Juan Pérez", // Cambiar por el nombre real del usuario
        comentario: nuevoComentario
      };

      try {
        const response = await axios.post('https://back-redsocial-3.onrender.com/obras/comentarios/nuevo', comentarioData);

        if (response.status === 201) {
          // Agregar el comentario a la obra seleccionada localmente
          const nuevasObras = obras.map((obra) => {
            if (obra._id === obraSeleccionada._id) {
              return { ...obra, comentarios: [...obra.comentarios, comentarioData] };
            }
            return obra;
          });

          setObras(nuevasObras);
          setObraSeleccionada(nuevasObras.find(o => o._id === obraSeleccionada._id));
          setNuevoComentario("");
        }
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
      }
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <h2 className="text-lg font-bold mb-4">Obras</h2>
        {obras.map((obra) => (
          <Card
            key={obra._id}
            className="mb-4 cursor-pointer"
            onClick={() => setObraSeleccionada(obra)}
          >
            <Carousel autoplay>
              {obra.imagenes.map((imgUrl, index) => (
                <img
                  key={index}
                  alt={obra.nombre || `Imagen ${index + 1}`}
                  src={imgUrl}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              ))}
            </Carousel>
            <h3 className="text-md font-semibold">{obra.nombre}</h3>
            <p>{obra.descripcion}</p>
          </Card>
        ))}
      </div>

      {obraSeleccionada && (
        <div className="w-2/3 bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-bold">{obraSeleccionada.nombre}</h2>

          <Carousel autoplay>
            {obraSeleccionada.imagenes.map((imgUrl, index) => (
              <img
                key={index}
                alt={obraSeleccionada.nombre || `Imagen ${index + 1}`}
                src={imgUrl}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            ))}
          </Carousel>

          <p className="mt-2">{obraSeleccionada.descripcion}</p>
          <h3 className="mt-4 text-lg font-semibold">Comentarios:</h3>
          <ul className="mt-2 border p-2 rounded">
            {obraSeleccionada.comentarios.map((comentario, index) => (
              <li key={index} className="border-b p-2 last:border-none">
                <strong className="text-blue-600">{comentario.nombre_usuario}:</strong>
                <span className="text-gray-700"> {comentario.comentario}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <Input
              placeholder="Agregar comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <Button type="primary" onClick={agregarComentario}>Comentar</Button>
          </div>
        </div>
      )}
    </div>
  );
}
