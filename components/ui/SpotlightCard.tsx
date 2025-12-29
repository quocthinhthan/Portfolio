"use client";
import React, { useRef, useState } from "react";

// Định nghĩa props rõ ràng hơn
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string; // 🟢 Thêm prop này để fix lỗi
}

export default function SpotlightCard({ 
  children, 
  className = "",
  spotlightColor = "rgba(56, 189, 248, 0.15)" // 🟢 Màu mặc định (Sky Blue nhạt)
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`relative rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition opacity-0 duration-300"
        style={{
          opacity,
          // 🟢 Sử dụng biến spotlightColor thay vì màu cứng
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}