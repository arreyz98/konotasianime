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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up ketika komponen unmount atau isOpen berubah
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="bg-[#1C2029] rounded-lg shadow-lg p-12 max-w-lg w-full relative">
        <div className="flex flex-col w-full items-center">
          <div className={clsx(`p-3 flex items-center justify-center rounded-lg bg-[#4C6E49] text-white font-bold uppercase text-2xl mb-4`,{
            'bg-[#4CAF50]' : rating === "Anak & Bimbingan",
            'bg-[#FFC107]' : rating === "Remaja",
            'bg-[#C62828]' : rating === "Dewasa Berat",
            'bg-[#FF7043]' : rating === "Dewasa Ringan"
          })}>
            {rating}
          </div>
          <p className="text-white text-center font-poppins font-bold text-lg mb-4">
            {description ||
              "Konten ini memiliki batasan usia. Pastikan Anda sudah cukup umur untuk mengakses konten ini."}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#4C6E49] hover:bg-[#6b9967] text-white rounded font-semibold uppercase mt-2"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeRatingModal;