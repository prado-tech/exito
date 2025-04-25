"use client";

interface DashboardCardProps {
  title: string;
  value: number;
  color: string;
  gradient?: boolean;
  className?: string;
}

export default function DashboardCard({ 
  title, 
  value, 
  color, 
  gradient = false, 
  className = "" 
}: DashboardCardProps) {
  // Definindo as cores para versão normal e gradiente
  const colorStyles = {
    blue: {
      normal: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      text: "text-blue-400"
    },
    yellow: {
      normal: "bg-yellow-500",
      gradient: "from-yellow-500 to-yellow-600",
      text: "text-yellow-400"
    },
    red: {
      normal: "bg-red-500",
      gradient: "from-red-500 to-red-600",
      text: "text-red-400"
    },
    indigo: {
      normal: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
      text: "text-indigo-400"
    }
  };

  // Seleciona o esquema de cores baseado na prop color
  const colors = colorStyles[color as keyof typeof colorStyles] || colorStyles.blue;

  return (
    <div className={`${className} ${gradient 
      ? `bg-gradient-to-r ${colors.gradient} text-white` 
      : `bg-[#161b22] border border-[#30363d] ${colors.text}`
    } p-5 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl`}>
      <h3 className="text-sm font-medium opacity-80 mb-1">{title}</h3>
      <p className="text-3xl font-bold mb-3">{value}</p>
      
      <div className="relative h-1.5 bg-black/10 rounded-full overflow-hidden">
        <div 
          className={`absolute top-0 left-0 h-full ${gradient ? 'bg-white/50' : colors.normal} rounded-full`}
          style={{ width: `${Math.min(100, (value / 20) * 100)}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs mt-2 opacity-70">
        <span>0</span>
        <span>{value * 5}</span>
      </div>
    </div>
  );
}