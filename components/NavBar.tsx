"use client";

import React from "react";
import { FiHome, FiPlusSquare, FiUser } from "react-icons/fi";

type NavBarProps = {
  onNavigate: (pagina: string) => void;
  paginaAtual: string;
  className?: string;
};

export default function NavBar({ 
  onNavigate, 
  paginaAtual,
  className = "" 
}: NavBarProps) {
  const items = [
    { 
      id: "home", 
      icon: <FiHome className="w-5 h-5" />,
      label: "Início"
    },
    { 
      id: "adicionar", 
      icon: <FiPlusSquare className="w-5 h-5" />,
      label: "Adicionar"
    },
    { 
      id: "perfil", 
      icon: <FiUser className="w-5 h-5" />,
      label: "Perfil"
    }
  ];

  return (
    <nav className={`${className} fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#161b22] border border-[#30363d] rounded-full px-4 py-2 shadow-xl backdrop-blur-sm z-50`}>
      <div className="flex items-center space-x-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`p-3 rounded-full flex flex-col items-center transition-all duration-300 ${
              paginaAtual === item.id 
                ? 'bg-[#f9d949] text-[#0d1117]' 
                : 'text-[#8b949e] hover:bg-[#30363d]'
            }`}
          >
            <span className={`transition-transform duration-300 ${
              paginaAtual === item.id ? 'scale-110' : 'scale-100'
            }`}>
              {item.icon}
            </span>
            <span className={`text-xs mt-1 ${
              paginaAtual === item.id ? 'font-bold' : 'font-medium'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}