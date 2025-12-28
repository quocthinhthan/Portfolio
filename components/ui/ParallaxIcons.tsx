// components/ui/ParallaxIcons.tsx
"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { 
  Database, Server, Box, Globe, Cpu, Layers,
  Rabbit, Shield, Zap, Terminal, Activity, MessageSquare
} from "lucide-react";

export default function ParallaxIcons() {
  const { scrollYProgress } = useScroll(); // Toàn trang

  // Giảm khoảng cách di chuyển để icons luôn visible lâu hơn
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -500]);     // Bay lên mạnh
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, -400]);   // Trung bình
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -200]);     // Chậm
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, 250]);   // Bay xuống
  const yFixed = useTransform(scrollYProgress, [0, 1], [0, -100]);       // Cố định

  // Rotation & Scale cho cảm giác 3D floating
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scaleFloat = useTransform(scrollYProgress, [0, 1], [0.8, 1.4]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Icon 1: Database */}
      <motion.div 
        style={{ y: yFast, rotate: rotateSlow }} 
        className="absolute top-[10%] left-[5%] text-sky-400/35 drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]"
      >
        <Database size={90} strokeWidth={1} />
      </motion.div>

      {/* Icon 2: Docker/Box */}
      <motion.div 
        style={{ y: yMedium, rotate: rotateReverse, scale: scaleFloat }} 
        className="absolute top-[30%] right-[10%] text-cyan-400/30 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      >
        <Box size={110} strokeWidth={0.6} />
      </motion.div>

      {/* Icon 3: Server */}
      <motion.div 
        style={{ y: yFast ,}} 
        className="absolute bottom-[20%] left-[15%] text-purple-400/35 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]"
      >
        <Server size={100} strokeWidth={0.8} />
      </motion.div>

      {/* Icon 4: CPU */}
      <motion.div 
        style={{ y: yReverse, scale: scaleFloat }} 
        className="absolute bottom-[10%] right-[5%] text-teal-400/30 drop-shadow-[0_0_15px_rgba(45,212,191,0.2)]"
      >
        <Cpu size={80} strokeWidth={1} />
      </motion.div>

      {/* Icon 5: Globe */}
      <motion.div 
        style={{ y: ySlow }} 
        className="absolute top-[15%] right-[30%] text-slate-300/25 drop-shadow-[0_0_10px_rgba(226,232,240,0.2)]"
      >
        <Globe size={130} strokeWidth={0.4} />
      </motion.div>    

      {/* Icon 7: Shield (Security/K8s) */}
      <motion.div 
        style={{ y: yFixed, rotate: rotateReverse }} 
        className="absolute top-[70%] right-[25%] text-emerald-400/30 drop-shadow-[0_0_15px_rgba(52,211,153,0.2)]"
      >
        <Shield size={60} strokeWidth={1} />
      </motion.div>

      {/* Icon 8: Zap (Event-driven) */}

      {/* Thêm vài icon nữa cho đầy background */}
      <motion.div style={{ y: ySlow }} className="absolute top-[40%] left-[10%] text-indigo-400/25">
        <Layers size={140} strokeWidth={0.5} />
      </motion.div>

      <motion.div style={{ y: yMedium }} className="absolute top-[60%] right-[8%] text-blue-400/30 drop-shadow-[0_0_15px_rgba(96,165,250,0.2)]">
        <Terminal size={85} strokeWidth={1} />
      </motion.div>

      <motion.div style={{ y: yFast }} className="absolute bottom-[40%] left-[25%] text-red-400/25">
        <Zap size={70} strokeWidth={1} />
      </motion.div>
    </div>
  );
}