import FormImovel from "components/FormImovel";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Painel do Admin</h1>
      <FormImovel />
    </main>
  );
}
