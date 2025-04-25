"use client";

import React, { useState } from "react";
import ImovelCard from "./ImovelCard";

type Imovel = {
  id: number;
  titulo: string;
  descricao?: string;
  preco?: number;
};

export default function ListaImoveis() {
  const [imoveis, setImoveis] = useState<Imovel[]>([
    { id: 1, titulo: "Casa A", descricao: "Linda casa com jardim", preco: 250000 },
    { id: 2, titulo: "Apartamento B", descricao: "Apartamento no centro", preco: 180000 },
    { id: 3, titulo: "Sobrado C", descricao: "Sobrado com 3 quartos", preco: 320000 },
  ]);

  function editar(id: number) {
    console.log("Editar imóvel", id);
    // Aqui você pode abrir um modal ou navegar para formulário de edição
  }

  function deletar(id: number) {
    console.log("Excluir imóvel", id);
    // Remover imóvel da lista para exemplo
    setImoveis((old) => old.filter(imovel => imovel.id !== id));
  }

  function compartilhar(id: number) {
    console.log("Compartilhar imóvel", id);
    // Implementar função para compartilhar via link, etc
  }

  return (
    <div>
      <h2>Lista de Imóveis</h2>
      {imoveis.length === 0 && <p>Nenhum imóvel cadastrado.</p>}
      {imoveis.map((imovel) => (
        <ImovelCard
          key={imovel.id}
          imovel={imovel}
          onEdit={editar}
          onDelete={deletar}
          onShare={compartilhar}
        />
      ))}
    </div>
  );
}
