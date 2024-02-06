"use client"
import ButtonAuth from "@/components/ButtonAuth";
import { IntroductionSection } from "@/components/IntroductionSection";
import { LandingHeader } from "@/components/LandingHeader";
import React, { useEffect, useState } from 'react';

import { fetchColaborations } from '@/app/api/colaboration';


export default function Home() {
  const [colaborations, setColaborations] = useState([]);

  useEffect(() => {
    const getColaborations = async () => {
      try {
        const colaborationsData = await fetchColaborations();
        setColaborations(colaborationsData);
      } catch (error) {
        console.error('Error al obtener colaboraciones:', error);
      }
    };

    getColaborations();
  }, []);
 

  return (
    <main>
    <LandingHeader/>

     <div className="snap-y snap-mandatory relative w-full h-screen overflow-auto ">
        <section id = "#Catalogo" className="snap-center">
          <IntroductionSection/>
        </section>
        <div className="snap-center">
          <div className="flex flex-col h-screen justify-center items-center mt-8">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold">Colaboraciones de artistas urbanos</h1>
            </div>
            <div className="flex overflow-x-auto space-x-4 p-4">
              {colaborations.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-64">
                  
                  <img src={`/colaboraciones/${item.nameimage}`} className="rounded-md mb-2 w-full h-40 object-cover" />
                  <h3 className="text-lg font-semibold">{item.namecolaboration}</h3>
                  <p className="text-gray-600">{item.nameartist}</p>
                  <span>{item.description}</span>
                </div>
              ))
              }
          </div>
        </div>
 
      

      </div>
        <div className="snap-center">
        <div className="flex justify-center items-center h-screen">
  <div className="bg-gray-200 p-8 rounded-lg shadow-md flex">
    <div className="w-1/2 pr-4">
      <p className="text-black font-semibold text-xl mb-4">Bienvenido a FlowOG</p>
      <p className="text-gray-700 mb-4">Nos dedicamos a mostrar las últimas tendencias en moda urbana. Nuestra plataforma proporciona un espacio para que los entusiastas de la moda urbana colaboren, compartan ideas y se mantengan inspirados.</p>
      <p className="text-gray-700">Explora nuestras colecciones, interactúa con personas con intereses similares y libera tu creatividad. Juntos, redefinamos el estilo urbano.</p>

    </div>
    <div className="w-1/2 pl-4">
      <form action="https://formspree.io/f/xnqepgvz" method="POST">
        <label className="block text-gray-700">Tu Correo:</label>
        <input type="email" name="email" id="email" className="form-input mt-1 block w-full rounded-md border-gray-300
         shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mb-4"/>
        <label className="block text-gray-700">Cuentanos:</label>
        <textarea name="message" id="message" className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mb-4"></textarea>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Send</button>
      </form>
    </div>
  </div>
</div>


        </div>
     </div>
    </main>
  );
}
