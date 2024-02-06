
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [codeDesigner, setCodeDesigner] = useState<string>();
  const [username, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `http://localhost:3002/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeDesigner,
          username,
          email,
          password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/");
  };

  return (
  <div className="min-h-screen flex items-center text-black justify-center bg-black-100">
  <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-96">
    <h2 className="text-2xl font-bold mb-6">Registro</h2>
    <label htmlFor="evento" className="block text-sm font-medium text-gray-600">
          Codigo Diseñador
    </label>
    <input
      type="text"
      placeholder="Código"
      name="FlowOg"
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
      value={codeDesigner}
      onChange={(event) => setCodeDesigner(event.target.value)}
    />
    <label htmlFor="evento" className="block text-sm font-medium text-gray-600">
          Correo
    </label>
    <input
      type="email"
      placeholder="Correo"
      name="email"
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    <label htmlFor="evento" className="block text-sm font-medium text-gray-600">
         Nombre de Usuario
    </label>
    <input
      type="text"
      placeholder="Nombre Usuario"
      name="Username"
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
      value={username}
      onChange={(event) => setUserName(event.target.value)}
    />
    <label htmlFor="evento" className="block text-sm font-medium text-gray-600">
          Contraseña
    </label>
    <input
      type="password"
      placeholder="Contraseña"
      name="password"
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />

    <button
      type="submit"
      className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none mt-4"
    >
      Registrar
    </button>
  </form>

  {errors.length > 0 && (
    <div className="alert alert-danger mt-2">
      <ul className="mb-0">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )}
</div>
);
};
export default RegisterPage;