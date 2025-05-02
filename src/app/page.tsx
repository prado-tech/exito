"use client";

import Header from "components/Header";
import DashboardCard from "components/DashboardCard";
import ImovelCard from "components/ImovelCard";
import FiltroImoveis from "components/FiltroImoveis";
import NavBar from "components/NavBar";
import FormImovel from "components/FormImovel";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ykknbbyefgltqnlkfqsb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra25iYnllZmdsdHFubGtmcXNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMjIxNjIsImV4cCI6MjA2MTY5ODE2Mn0.x4anLheMwHfadi_FTSKUgG1eb7o85-8fpCZm9qbQgHc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPage() {
  const [paginaAtual, setPaginaAtual] = useState("home");
  const [imoveis, setImoveis] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Carrega os imóveis do Supabase
  const carregarImoveis = async () => {
    const { data, error } = await supabase
      .from('imoveis')
      .select('*');
    
    if (error) {
      console.error('Erro ao carregar imóveis:', error);
      return;
    }
    
    setImoveis(data || []);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (["home", "adicionar", "perfil"].includes(hash)) {
      setPaginaAtual(hash);
    }
  }, []);

  useEffect(() => {
    window.location.hash = paginaAtual;
  }, [paginaAtual]);

  useEffect(() => {
    carregarImoveis();

    // Configura subscription para atualizações em tempo real
    const subscription = supabase
      .channel('imoveis-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'imoveis' },
        () => carregarImoveis()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0e14] to-[#1a2639] text-[#f0f0f0] p-4 pb-24 flex flex-col">
      <Header className={isScrolled ? "shadow-lg bg-[#0a0e14]/90 backdrop-blur-sm" : ""} />

      {paginaAtual === "home" && (
        <div className="space-y-8 mt-6">
          <FiltroImoveis 
            onFilter={() => {}} 
            className="bg-[#161b22]/50 border border-[#30363d] rounded-2xl p-4 backdrop-blur-sm"
          />

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[#f9d949]">Visão Geral</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard 
                title="Imóveis Locados" 
                value={imoveis.filter(i => i.status === 'ALUGADO').length} 
                color="from-[#3b82f6] to-[#1d4ed8]" 
                gradient 
              />
              <DashboardCard 
                title="Contratos Que Vão Encerrar" 
                value={5} 
                color="from-[#f59e0b] to-[#d97706]" 
                gradient 
              />
              <DashboardCard 
                title="Aluguéis Atrasados" 
                value={3} 
                color="from-[#ef4444] to-[#dc2626]" 
                gradient 
              />
              <DashboardCard 
                title="Documentos Faltando" 
                value={8} 
                color="from-[#8b5cf6] to-[#7c3aed]" 
                gradient
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#f9d949]">Imóveis Recentes</h2>
              <button className="text-sm bg-[#f9d949] text-[#0d1117] px-4 py-2 rounded-lg font-medium hover:bg-[#e6c642] transition-all">
                Ver Todos
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imoveis.slice(0, 6).map((imovel) => (
                <ImovelCard 
                  key={imovel.id} 
                  imovel={imovel} 
                  className="hover:scale-[1.02] transition-transform duration-300"
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {paginaAtual === "adicionar" && (
        <section className="bg-[#161b22]/80 backdrop-blur-sm border border-[#30363d] p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto w-full mt-8">
          <div className="flex items-center mb-6 space-x-3">
            <div className="p-2 bg-[#f9d949]/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f9d949]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold">
              Adicionar <span className="text-[#f9d949]">Imóvel</span>
            </h2>
          </div>
          <FormImovel onSuccess={carregarImoveis} />
        </section>
      )}

      {paginaAtual === "perfil" && (
        <section className="bg-[#161b22]/80 backdrop-blur-sm border border-[#30363d] p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto w-full mt-8 text-center">
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f9d949] to-[#e6c642] flex items-center justify-center">
                <span className="text-3xl font-bold text-[#0d1117]">JS</span>
              </div>
              <button className="absolute bottom-0 right-0 bg-[#30363d] p-2 rounded-full hover:bg-[#f9d949] hover:text-[#0d1117] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl font-bold mb-2">John Smith</h2>
            <p className="text-[#8b949e] mb-6">Administrador</p>
            
            <div className="w-full max-w-md space-y-4 text-left">
              <div className="flex justify-between border-b border-[#30363d] pb-2">
                <span className="text-[#8b949e]">Email</span>
                <span>john.smith@example.com</span>
              </div>
              <div className="flex justify-between border-b border-[#30363d] pb-2">
                <span className="text-[#8b949e]">Telefone</span>
                <span>+55 (11) 98765-4321</span>
              </div>
              <div className="flex justify-between border-b border-[#30363d] pb-2">
                <span className="text-[#8b949e]">Cadastrado em</span>
                <span>15/03/2022</span>
              </div>
            </div>
            
            <button className="mt-8 bg-[#f9d949] text-[#0d1117] px-6 py-2 rounded-lg font-medium hover:bg-[#e6c642] transition-all">
              Editar Perfil
            </button>
          </div>
        </section>
      )}

      <NavBar 
        onNavigate={setPaginaAtual} 
        paginaAtual={paginaAtual} 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#161b22] border border-[#30363d] rounded-full px-4 py-2 shadow-xl"
      />
    </main>
  );
}