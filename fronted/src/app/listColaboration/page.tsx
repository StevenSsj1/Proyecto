"use client"
// pages/index.js

import { useEffect, useState } from 'react';
import { fetchColaborations, fetchDeleteColaborations } from '@/app/api/colaboration';


const IndexPage = () => {
  const [colaborations, setColaborations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchColaborations();
        setColaborations(data);
      } catch (error) {
        console.error('Error fetching colaborations:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Implementa la lógica de edición según tus necesidades
    console.log(`Editar colaboración con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación según tus
    console.log(`Eliminar colaboración con ID: ${id}`);
    const updatedColaborations = colaborations.filter((collaboration) => collaboration.id !== id);
    setColaborations(updatedColaborations);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl pt-20 font-bold mb-4">Tabla de Colaboraciones</h1>

      <table className="min-w-full bg-white text-black border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Colaborador</th>
            <th className="py-2 px-4 border-b">Proyecto</th>
            <th className="py-2 px-4 border-b">Rol</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {colaborations.map((collaboration) => (
            <tr key={collaboration.id_colab}>
              <td className="py-2 px-4 border-b">{collaboration.description}</td>
              <td className="py-2 px-4 border-b">{collaboration.namecolaboration}</td>
              <td className="py-2 px-4 border-b">{collaboration.nameartist}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(collaboration.id_colab)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(collaboration.id_colab)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
