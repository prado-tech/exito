// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase"; // Certifique-se de que o caminho está correto

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Usando o Supabase para registrar o usuário
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      alert("Usuário registrado com sucesso!");
      router.push("/"); // Redireciona para home ou dashboard
    } catch (error: any) {
      alert("Erro ao registrar: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Registrar novo usuário</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
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
