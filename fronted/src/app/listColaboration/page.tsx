"use client"

import React, { useEffect, useState } from 'react';
import { fetchColaborations, fetchDeleteColaborations, fetchEditColaboration } from '@/app/api/colaboration';

const IndexPage = () => {
  const [colaborations, setColaborations] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [description, setDescription] = useState('');
  const [nameartist, setNameArtist] = useState('');
  const [namecolaboration, setNameColaboration] = useState('');

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

  const handleEdit = async (id) => {
    try {
      const updatedColaborations = colaborations.map((collaboration) => {
        if (collaboration.id_colab === id) {
          return {
            ...collaboration,
            description: description,
            nameartist: nameartist,
            namecolaboration: namecolaboration
          };
        }
        return collaboration;
      });

      setColaborations(updatedColaborations);

      const res = await fetch(
        `http://localhost:3002/colab/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            nameartist,
            namecolaboration,
    
          }),
        }
      );
      const responseAPI = await res.json();
      console.log(responseAPI)

     
    } catch (error) {
      console.error('Error editing collaboration:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3002/colab/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          
        }
      );
      const responseAPI = await res.json();
      console.log(responseAPI)

      const updatedColaborations = colaborations.filter((collaboration) => collaboration.id_colab !== id);
      setColaborations(updatedColaborations);
    } catch (error) {
      console.error('Error deleting collaboration:', error);
    }
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
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={editableId === collaboration.id_colab ? description : collaboration.description}
                  onChange={(e) => setDescription(e.target.value)}
                  readOnly={editableId !== collaboration.id_colab}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={editableId === collaboration.id_colab ? namecolaboration : collaboration.namecolaboration}
                  onChange={(e) => setNameColaboration(e.target.value)}
                  readOnly={editableId !== collaboration.id_colab}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={editableId === collaboration.id_colab ? nameartist : collaboration.nameartist}
                  onChange={(e) => setNameArtist(e.target.value)}
                  readOnly={editableId !== collaboration.id_colab}
                />
              </td>
              <td className="py-2 px-4 border-b">
                {editableId === collaboration.id_colab ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEdit(collaboration.id_colab)}
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setEditableId(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setEditableId(collaboration.id_colab)}
                  >
                    Editar
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
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
