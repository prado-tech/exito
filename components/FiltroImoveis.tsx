"use client";

import { useState } from "react";
import { FiSearch, FiDollarSign, FiFilter } from "react-icons/fi";

type Filtro = {
  busca: string;
  precoMin: number | null;
  precoMax: number | null;
};

type FiltroImoveisProps = {
  onFilter: (filtros: Filtro) => void;
  className?: string;
};

export default function FiltroImoveis({ 
  onFilter, 
  className = "" 
}: FiltroImoveisProps): React.JSX.Element {
  const [busca, setBusca] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  function aplicarFiltro() {
    onFilter({
      busca,
      precoMin: precoMin ? parseFloat(precoMin) : null,
      precoMax: precoMax ? parseFloat(precoMax) : null,
    });
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      aplicarFiltro();
    }
  }

  return (
    <div className={`${className} bg-[#161b22]/50 border border-[#30363d] rounded-xl p-4 backdrop-blur-sm`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Campo de busca */}
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Buscar imóvel
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-[#8b949e]" />
            </div>
            <input
              type="text"
              placeholder="Título ou descrição"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9d949] focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtro de preço mínimo */}
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Preço mínimo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="h-4 w-4 text-[#8b949e]" />
            </div>
            <input
              type="number"
              placeholder="R$ mínimo"
              value={precoMin}
              onChange={(e) => setPrecoMin(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9d949] focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        {/* Filtro de preço máximo */}
        <div>
          <label className="block text-sm font-medium text-[#8b949e] mb-1">
            Preço máximo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="h-4 w-4 text-[#8b949e]" />
            </div>
            <input
              type="number"
              placeholder="R$ máximo"
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9d949] focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        {/* Botão de aplicar filtro */}
        <div>
          <button
            onClick={aplicarFiltro}
            className="w-full bg-[#f9d949] text-[#0d1117] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6c642] transition-colors flex items-center justify-center"
          >
            <FiFilter className="mr-2" />
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}