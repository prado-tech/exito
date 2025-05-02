"use client";

import React from "react";
import { useRouter } from "next/navigation";




type Imovel = {
  id: number;
  titulo: string;
  descricao?: string;
  preco?: number;
  encadta?: string;
  status?: string;
  documentos?: string;
  administradora?: string;
  imagens?: string[];
};

type Props = {
  imovel: Imovel;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onShare?: (id: number) => void;
  className?: string;
};

export default function ImovelCard({
  imovel,
  onEdit,
  onDelete,
  onShare,
  className = ""
}: Props) {
  const statusColors: Record<string, string> = {
    ALUGADO: "bg-green-500/10 text-green-400",
    DISPONÍVEL: "bg-blue-500/10 text-blue-400",
    MANUTENÇÃO: "bg-yellow-500/10 text-yellow-400",
    VENDIDO: "bg-purple-500/10 text-purple-400",
    default: "bg-gray-500/10 text-gray-400"
  };

  const status = imovel.status?.toUpperCase() || "";
  const statusClass = statusColors[status] || statusColors.default;

  return (
    <div className={`${className} bg-[#161b22]/80 backdrop-blur-sm border border-[#30363d] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#f9d949]/30`}>
      {/* Imagem do imóvel */}
      <div className="relative h-48 bg-[#0d1117]">
        {imovel.imagens?.length ? (
          <img
            src={imovel.imagens[0]}
            alt={imovel.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-[#8b949e]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Informações do imóvel */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg truncate">{imovel.titulo}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>
            {status || "INDEFINIDO"}
          </span>
        </div>

        {imovel.descricao && (
          <p className="text-sm text-[#8b949e] mb-3 line-clamp-2">
            {imovel.descricao}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          {imovel.preco && (
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#f9d949]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>R$ {imovel.preco.toLocaleString('pt-BR')}</span>
            </div>
          )}

          {imovel.administradora && (
            <div className="flex items-center text-sm text-[#8b949e]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {imovel.administradora}
            </div>
          )}

          {imovel.encadta && (
            <div className="flex items-center text-sm text-[#8b949e]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {imovel.encadta}
            </div>
          )}

          {imovel.documentos && (
            <div className={`flex items-center text-sm ${imovel.documentos === 'OK' ? 'text-green-400' : 'text-yellow-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {imovel.documentos === 'OK' ? 'Docs OK' : 'Pendente'}
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-between border-t border-[#30363d] pt-3">
          <button
            onClick={() => onEdit?.(imovel.id)}
            className="text-[#f9d949] hover:text-[#e6c642] transition-colors flex items-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Editar
          </button>
          
          <button
            onClick={() => onShare?.(imovel.id)}
            className="text-[#58a6ff] hover:text-[#3d8bf5] transition-colors flex items-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Compartilhar
          </button>
          
          <button
            onClick={() => onDelete?.(imovel.id)}
            className="text-[#f85149] hover:text-[#da3633] transition-colors flex items-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}