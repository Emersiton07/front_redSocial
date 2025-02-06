import { useState } from "react";
import { Card, Input, Button } from "antd";

const obrasEjemplo = [
  {
    id: 1,
    nombre: "Mural de la Libertad",
    descripcion: "Un mural representando la lucha por la justicia.",
    imagen: "https://via.placeholder.com/150",
    comentarios: ["Impresionante obra", "Gran detalle en los colores"]
  },
  {
    id: 2,
    nombre: "Arte Callejero Vivo",
    descripcion: "Expresión urbana en su máxima expresión.",
    imagen: "https://via.placeholder.com/150",
    comentarios: ["Muy expresivo", "Refleja la cultura de la ciudad"]
  }
];

export default function SocialPage() {
  const [obraSeleccionada, setObraSeleccionada] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const agregarComentario = () => {
    if (obraSeleccionada && nuevoComentario.trim() !== "") {
      const nuevasObras = obrasEjemplo.map((obra) => {
        if (obra.id === obraSeleccionada.id) {
          return { ...obra, comentarios: [...obra.comentarios, nuevoComentario] };
        }
        return obra;
      });
      setObraSeleccionada(nuevasObras.find((o) => o.id === obraSeleccionada.id));
      setNuevoComentario("");
    }
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Lista de obras */}
      <div className="w-1/3">
        <h2 className="text-lg font-bold mb-4">Obras</h2>
        {obrasEjemplo.map((obra) => (
          <Card
            key={obra.id}
            className="mb-4 cursor-pointer"
            onClick={() => setObraSeleccionada(obra)}
          >
            <img src={obra.imagen} alt={obra.nombre} className="mb-2 w-full h-32 object-cover" />
            <h3 className="text-md font-semibold">{obra.nombre}</h3>
            <p>{obra.descripcion}</p>
          </Card>
        ))}
      </div>

      {/* Detalles de obra seleccionada */}
      {obraSeleccionada && (
        <div className="w-2/3 bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl font-bold">{obraSeleccionada.nombre}</h2>
          <img src={obraSeleccionada.imagen} alt={obraSeleccionada.nombre} className="w-full h-48 object-cover mt-2" />
          <p className="mt-2">{obraSeleccionada.descripcion}</p>
          <h3 className="mt-4 text-lg font-semibold">Comentarios:</h3>
          <ul className="mt-2 border p-2 rounded">
            {obraSeleccionada.comentarios.map((comentario, index) => (
              <li key={index} className="border-b p-2 last:border-none">{comentario}</li>
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


