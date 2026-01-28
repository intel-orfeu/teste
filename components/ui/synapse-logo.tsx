import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SynapseLogo = ({ className = "w-10 h-10" }: { className?: string }) => {
  // Coordenadas para visão superior do cérebro (Dois Hemisférios)
  // ViewBox estimado: 0 0 120 100
  const nodes = [
    // --- Hemisfério Esquerdo ---
    { id: 0, x: 54, y: 30 }, // Inner Top
    { id: 1, x: 44, y: 15 }, // Top Arch
    { id: 2, x: 26, y: 22 }, // Top Left
    { id: 3, x: 12, y: 45 }, // Extreme Left
    { id: 4, x: 18, y: 70 }, // Bottom Left
    { id: 5, x: 38, y: 85 }, // Bottom Arch
    { id: 6, x: 54, y: 75 }, // Inner Bottom
    { id: 7, x: 54, y: 52 }, // Inner Mid (Gap edge)
    { id: 8, x: 36, y: 40 }, // Core Upper
    { id: 9, x: 36, y: 65 }, // Core Lower

    // --- Hemisfério Direito (Espelhado em X=60) ---
    { id: 10, x: 66, y: 30 }, // Inner Top
    { id: 11, x: 76, y: 15 }, // Top Arch
    { id: 12, x: 94, y: 22 }, // Top Right
    { id: 13, x: 108, y: 45 },// Extreme Right
    { id: 14, x: 102, y: 70 },// Bottom Right
    { id: 15, x: 82, y: 85 }, // Bottom Arch
    { id: 16, x: 66, y: 75 }, // Inner Bottom
    { id: 17, x: 66, y: 52 }, // Inner Mid (Gap edge)
    { id: 18, x: 84, y: 40 }, // Core Upper
    { id: 19, x: 84, y: 65 }, // Core Lower
  ];

  // Conexões definindo a estrutura da rede neural
  const connections = [
    // --- Malha Esquerda ---
    // Perímetro
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    // Conexões Internas (Core Upper)
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 7],
    // Conexões Internas (Core Lower)
    [9, 7], [9, 3], [9, 4], [9, 5], [9, 6],
    // Eixo Central Esquerdo
    [8, 9],

    // --- Malha Direita ---
    // Perímetro
    [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 10],
    // Conexões Internas (Core Upper)
    [18, 10], [18, 11], [18, 12], [18, 13], [18, 17],
    // Conexões Internas (Core Lower)
    [19, 17], [19, 13], [19, 14], [19, 15], [19, 16],
    // Eixo Central Direito
    [18, 19],
    
    // Opcional: Ponte Corpus Callosum (Sutil)
    [7, 17]
  ];

  const [activePaths, setActivePaths] = useState<number[]>([]);

  // Simulação de atividade neural em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Dispara 2 a 4 sinapses aleatórias por ciclo
      const count = Math.floor(Math.random() * 3) + 2;
      const newActive = [];
      for (let i = 0; i < count; i++) {
        newActive.push(Math.floor(Math.random() * connections.length));
      }
      setActivePaths(newActive);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className}>
      <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {/* Gradiente mantendo a identidade visual mas sutilmente mais vibrante */}
            <stop offset="0%" stopColor="#06b6d4" />   {/* Cyan-500 */}
            <stop offset="50%" stopColor="#3b82f6" />  {/* Blue-500 */}
            <stop offset="100%" stopColor="#8b5cf6" /> {/* Violet-500 (touch of purple) */}
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 1. Estrutura Base (Conexões Inativas) */}
        {connections.map(([start, end], i) => (
          <line
            key={`base-${i}`}
            x1={nodes[start].x} y1={nodes[start].y}
            x2={nodes[end].x} y2={nodes[end].y}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-slate-300 dark:text-slate-700 opacity-30"
          />
        ))}

        {/* 2. Sinapses Disparando (Animação) */}
        {connections.map(([start, end], i) => {
          const isActive = activePaths.includes(i);
          return (
            <motion.line
              key={`synapse-${i}`}
              x1={nodes[start].x} y1={nodes[start].y}
              x2={nodes[end].x} y2={nodes[end].y}
              stroke="url(#neuralGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut"
              }}
            />
          );
        })}

        {/* 3. Nós Neurais */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={node.x} cy={node.y} r="2.5"
              className="fill-slate-400 dark:fill-slate-600"
            />
            {/* Brilho no nó quando ativo */}
            <motion.circle
              cx={node.x} cy={node.y} r="4"
              className="fill-cyan-500"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                activePaths.some(idx => connections[idx].includes(i)) 
                ? { scale: 1.4, opacity: 1 } 
                : { scale: 0, opacity: 0 }
              }
              transition={{ duration: 0.2 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};