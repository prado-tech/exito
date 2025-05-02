"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { supabase } from "@/app/lib/supabase"

interface FormImovelProps {
  onSuccess?: () => void;
}

export default function FormImovel({ onSuccess }: FormImovelProps) {
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [endereco, setEndereco] = useState("")
  const [fotos, setFotos] = useState<FileList | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fotos || fotos.length === 0) return alert("Adicione ao menos uma foto.")
    setCarregando(true)

    try {
      // Upload de cada imagem para o Supabase Storage
      const fotoURLs = await Promise.all(
        Array.from(fotos).map(async (foto) => {
          const nomeArquivo = `${Date.now()}-${foto.name}`
          const { data, error } = await supabase.storage
            .from('imoveis')
            .upload(nomeArquivo, foto, { upsert: true });
          
          if (error) {
              console.error('Erro detalhado:', JSON.stringify(error, null, 2));
              throw error;
          }

          // Obter URL pública da imagem
          const { data: { publicUrl } } = supabase.storage
            .from('imoveis')
            .getPublicUrl(nomeArquivo)
          
          return publicUrl
        })
      )

      // Inserir dados na tabela 'imoveis' no Supabase
      const { data, error } = await supabase
        .from('imoveis')
        .insert({
          titulo,
          descricao,
          valor: parseFloat(valor),
          endereco,
          fotos: fotoURLs,
          //status: 'DISPONÍVEL'
        })
        .select()

      if (error) throw error

      setSucesso(true)
      setTitulo("")
      setDescricao("")
      setValor("")
      setEndereco("")
      setFotos(null)
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar imóvel:", JSON.stringify(error, null, 2))
      alert("Erro ao salvar. Veja o console.")
    }

    setCarregando(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFotos(e.target.files)}
        className="w-full"
      />

      <button
        type="submit"
        disabled={carregando}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {carregando ? "Salvando..." : "Cadastrar Imóvel"}
      </button>

      {sucesso && <p className="text-green-600">Imóvel cadastrado com sucesso!</p>}
    </form>
  )
}