// api/colaborations.js
export const fetchColaborations = async () => {
    const response = await fetch('http://localhost:3002/colab'); // Ajusta la ruta según tu configuración
    if (!response.ok) {
      throw new Error('Error al obtener colaboraciones');
    }
    return response.json();
  };

export const fetchDeleteColaborations = async (id) => {
    const response = await fetch(`http://localhost:3002/colab/${3}`); // Ajusta la ruta según tu configuración
    if (!response.ok) {
      throw new Error('Error al obtener colaboraciones');
    }
    return response.json();
  };
  


  