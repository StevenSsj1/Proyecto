"use client"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { request } from "http";

export default function HomeDash() {

  const [errors, setErrors] = useState<string[]>([]);
  const [userDesigner, setUserDesigner] = useState('');
  const [description, setDescription] = useState('');
  const [nameArtist, setNameArtist] = useState('');
  const [nameColaboration, setNameColaboration] = useState('');
  const [nameImage, setNameImage] = useState('');
  const [emailDesigner, setEmailDesigner] = useState('');
  const { data: session, status } = useSession();



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await fetch(
      `http://localhost:3002/colab`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userDesigner,
          description,
          nameArtist,
          nameColaboration,
          nameImage,
          emailDesigner
        }),
      }
    );
    const responseAPI = await res.json();
  console.log(responseAPI)
  }
  
  const [file, setFile] = useState(null);
  return(
    
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white pt-2 p-2 shadow-md rounded-md w-96">
        {/* Your form input fields using the state variables */}
        <input
          type="text"
          value={userDesigner}
          onChange={(e) => setUserDesigner(e.target.value)}
          placeholder="User Designer"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none text-black focus:border-blue-500"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none text-black focus:border-blue-500"
        ></textarea>

        <input
          type="text"
          value={nameArtist}
          onChange={(e) => setNameArtist(e.target.value)}
          placeholder="Name Artist"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none text-black focus:border-blue-500"
        />

        <input
          type="text"
          value={nameColaboration}
          onChange={(e) => setNameColaboration(e.target.value)}
          placeholder="Name Colaboration"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none text-black focus:border-blue-500"
        />

        <input
          type="text"
          value={nameImage}
          onChange={(e) => setNameImage(e.target.value)}
          placeholder="Name Image"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none text-black focus:border-blue-500"
        />

        <input
          type="text"
          value={emailDesigner}
          onChange={(e) => setEmailDesigner(e.target.value)}
          placeholder="Email Designer"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none text-black focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    <section>
    <div>
      <form className="pt-40"
      onSubmit={async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);

        const response = await fetch('api/upload',{
          method: "POST",
          body: formData
        });
        const data = await response.json();
        console.log(data)
      }}>
      <input
      type="file"
      onChange={(e)=>{
        setFile(e.target.files[0]);
      }}>
      
      </input>
      <button>
        Enviar
      </button>
      </form>
    </div>
    </section>
  </div>




    
  )
}