// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { auth } from "@/app/lib/supabase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      //await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuário registrado com sucesso!");
      router.push("/"); // Redireciona para home ou dashboard
    } catch (error: any) {
      alert("Erro ao registrar: " + error.message);
    }
  }*/

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Registrar novo usuário</h1>
      <form onSubmit={() => {}} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
