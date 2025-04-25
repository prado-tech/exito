"use client";

import { useEffect, useState } from "react";

export default function FormImovel() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotos, setFotos] = useState<File[]>([]);
  const [documentos, setDocumentos] = useState<File[]>([]);
  const [previewFotos, setPreviewFotos] = useState<string[]>([]);

  useEffect(() => {
    const urls = fotos.map((file) => URL.createObjectURL(file));
    setPreviewFotos(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [fotos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode integrar com Firebase ou API
    console.log({ titulo, descricao, fotos, documentos });
    alert("Imóvel cadastrado!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Título do Imóvel</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full bg-[#161b22] border border-[#2a2f38] rounded-lg p-2 text-white"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full bg-[#161b22] border border-[#2a2f38] rounded-lg p-2 text-white"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Fotos do Imóvel</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setFotos(Array.from(e.target.files));
            }
          }}
          className="text-white"
        />
        <div className="flex gap-2 mt-2">
          {previewFotos.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`preview-${index}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Documentos (PDF, Excel)</label>
        <input
          type="file"
          accept=".pdf,.xlsx,.xls"
          multiple
          onChange={(e) => {
            if (e.target.files) {
              setDocumentos(Array.from(e.target.files));
            }
          }}
          className="text-white"
        />
        <ul className="list-disc list-inside text-sm mt-2">
          {documentos.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        className="bg-[#f9d949] text-[#0d1117] px-4 py-2 rounded-lg font-semibold"
      >
        Cadastrar Imóvel
      </button>
    </form>
  );
}
