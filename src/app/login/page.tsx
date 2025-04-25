"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/admin"); // Depois você pode verificar se é admin ou cliente
    } catch (error) {
      console.error(error);
      alert("Erro ao logar. Verifique email e senha.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="border p-2 mb-4 w-full"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Entrar
      </button>
    </div>
  );
}
