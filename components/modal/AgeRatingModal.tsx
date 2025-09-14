"use client"

import React from "react";
import { useEffect } from "react";
import clsx from "clsx";

interface AgeRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating: string; // seperti "13+", "17+", dll
  description?: string;
}

const AgeRatingModal: React.FC<AgeRatingModalProps> = ({
  isOpen,
  onClose,
  rating,
  description,
}) => {
      useEffect(() => {
    // 🔒 Disable scroll body saat modal aktif
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = "hidden"
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up ketika komponen unmount atau isOpen berubah
    return () => {
       document.body.style.overflow = originalStyle
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Modal box */}
      <div
        className="relative bg-[#1C2029] rounded-lg shadow-lg 
                   w-[calc(100%-2rem)] max-w-sm sm:max-w-md md:max-w-lg
                   p-6 sm:p-8 md:p-12"
      >
        <div className="flex flex-col w-full items-center">
          {/* Badge */}
          <div
            className={clsx(
              `p-2 sm:p-3 flex items-center justify-center rounded-lg 
               text-white font-bold uppercase text-xs sm:text-xl md:text-2xl mb-4`,
              {
                "bg-[#4CAF50]": rating === "Anak & Bimbingan",
                "bg-[#FFC107]": rating === "Remaja",
                "bg-[#C62828]": rating === "Dewasa Berat",
                "bg-[#FF7043]": rating === "Dewasa Ringan",
                "bg-[#4C6E49]": ![
                  "Anak & Bimbingan",
                  "Remaja",
                  "Dewasa Berat",
                  "Dewasa Ringan",
                ].includes(rating),
              }
            )}
          >
            {rating}
          </div>

          {/* Description */}
          <p className="text-white text-center font-poppins font-bold text-xs sm:text-lg md:text-xl mb-4">
            {description ||
              "Konten ini memiliki batasan usia. Pastikan Anda sudah cukup umur untuk mengakses konten ini."}
          </p>

          {/* Action */}
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-[#4C6E49] hover:bg-[#6b9967] 
                       text-white text-xs sm:text-lg rounded font-semibold uppercase mt-2 transition"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  )

};

export default AgeRatingModal;