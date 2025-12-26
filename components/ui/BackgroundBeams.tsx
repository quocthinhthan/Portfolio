"use client";
import { motion } from "framer-motion";

export default function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-slate-950">
        {/* Orb 1: Cyan */}
        <motion.div
            animate={{
                x: [0, 100, -50, 0],
                y: [0, -50, 100, 0],
                scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[100px] opacity-40"
        />

        {/* Orb 2: Purple */}
        <motion.div
            animate={{
                x: [0, -100, 50, 0],
                y: [0, 100, -50, 0],
                scale: [1, 1.1, 0.8, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] opacity-40"
        />

        {/* Orb 3: Blue bottom */}
        <motion.div
             animate={{
                scale: [1, 1.3, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[110px] opacity-40"
        />
        
        {/* Grid Overlay mờ mờ để tạo chất "Tech" */}
        <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
    </div>
  );
}