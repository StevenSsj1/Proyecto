// utils/api.js
export const uploadColaboration = async (formData, accessToken) => {
  
  try {
    const response = await fetch('api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      return await response.json();
    } else {
      const data = await response.json();
      throw new Error(data.errors || 'Error desconocido');
    }
  } catch (error) {
    console.error('Error al enviar formulario:', error);
    throw new Error('Error interno del servidor');
  }
};
