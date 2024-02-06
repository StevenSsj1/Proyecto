// api/colaborations.js
export const fetchColaborations = async () => {
    const response = await fetch('http://localhost:3002/colab'); // Ajusta la ruta según tu configuración
    if (!response.ok) {
      throw new Error('Error al obtener colaboraciones');
    }
    return response.json();
  };

export const fetchDeleteColaborations = async () => {
    const response = await fetch('http://localhost:3002/colab'); // Ajusta la ruta según tu configuración
    if (!response.ok) {
      throw new Error('Error al obtener colaboraciones');
    }
    return response.json();
  };
  
// api/colaborations.js
export const fetchEditColaboration = async (id, updatedData) => {
  const response = await fetch(`http://localhost:3002/colab/${id}`);

  if (!response.ok) {
    throw new Error('Error al editar colaboración');
  }

  return response.json();
};

  