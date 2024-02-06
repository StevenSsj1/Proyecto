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
        // Maneja el error según tus necesidades
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
          <IntroductionSection/>
        </div>
     </div>
     <ButtonAuth/>
    </main>
  );
}
