"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/dashboard");
  };

  return (

    <div className="flex items-center ustify-center min-h-screen">
    <div className="max-w-md mx-auto p-4 bg-white text-black shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4" >Registro</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Correo Electrónico
      </label>
        <input
          type="email"
          placeholder="test@test.com"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
       </div>
       <div className="mb-4">
       <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Contraseña
          </label>
        <input
          type="password"
          placeholder="123123"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
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
    </div>
  );
};
export default LoginPage;
