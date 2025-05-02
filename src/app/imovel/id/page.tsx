"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/app/lib/supabase" // Certifique-se de importar o cliente do Supabase corretamente
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"

type Imovel = {
  titulo: string
  valor: number
  endereco: string
  descricao?: string
  fotos: string[]
  criadoEm?: any
}

export default function PaginaDetalhesImovel() {
  const { id } = useParams()
  const [imovel, setImovel] = useState<Imovel | null>(null)

  useEffect(() => {
    if (!id) return

    const carregarImovel = async () => {
      // Usando Supabase para pegar os dados
      const { data, error } = await supabase
        .from('imoveis')
        .select('*')
        .eq('id', id) // Supondo que a coluna 'id' seja o identificador único
        .single() // Retorna um único registro

      if (error) {
        console.error("Erro ao carregar imóvel:", error)
      } else {
        setImovel(data as Imovel)
      }
    }

    carregarImovel()
  }, [id])

  if (!imovel) return <p className="p-4">Carregando imóvel...</p>

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#f9d949]">{imovel.titulo}</h1>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        className="rounded-lg overflow-hidden shadow-md"
      >
        {imovel.fotos.map((foto, i) => (
          <SwiperSlide key={i}>
            <img src={foto} alt={`Foto ${i + 1}`} className="w-full h-72 object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="space-y-2 text-[#f0f0f0]">
        <p className="text-xl font-semibold text-green-400">R$ {imovel.valor.toLocaleString()}</p>
        <p><strong>Endereço:</strong> {imovel.endereco}</p>
        {imovel.descricao && (
          <p><strong>Descrição:</strong> {imovel.descricao}</p>
        )}
      </div>
    </div>
  )
}
