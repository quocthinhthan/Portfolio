// components/NewYearModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerTetConfetti } from "@/lib/confetti"; // Import hàm vừa tạo

const NewYearModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Kiểm tra xem người dùng đã xem thông báo này trong phiên này chưa
    const hasSeenModal = sessionStorage.getItem("hasSeenNewYearGreeting");
    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 1500); // Hiện sau 1.5s để tạo bất ngờ
      return () => clearTimeout(timer);
    }
  }, []);

    const closeModal = () => {
        // Kích hoạt hiệu ứng pháo hoa
        triggerTetConfetti();
        
        // Đóng modal (có thể delay nhẹ 1 chút để người dùng kịp nhìn pháo hoa)
        setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenNewYearGreeting", "true");
        }, 300); 
    };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative max-w-md w-full bg-slate-900 border border-yellow-500/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(234,179,8,0.2)] text-center"
          >
            {/* Trang trí góc */}
            <div className="absolute top-0 right-0 p-4 text-2xl">🧨</div>
            <div className="absolute bottom-0 left-0 p-4 text-2xl">🧧</div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent mb-4">
              Chúc Mừng Năm Mới!
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              Năm mới Giáp Thìn 2026, chúc mọi người một năm tràn đầy năng lượng, 
              <span className="text-yellow-400"> "Logic vững vàng, Bug hàng hiếm gặp"</span>. 
              Hy vọng mọi kế hoạch và dự án của bạn đều sẽ "Deploy" thành công rực rỡ!
            </p>

            <button
              onClick={closeModal}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-full font-medium transition-all transform hover:scale-105"
            >
              Khai xuân thôi!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewYearModal;