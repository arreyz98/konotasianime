"use client"
import { useState, useEffect } from "react"

export default function DeskripsiMobile({ deskripsi }: { deskripsi: string }) {
  const [showModal, setShowModal] = useState(false)
  const MAX_LENGTH = 180
  const isLong = deskripsi.length > MAX_LENGTH

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [showModal])
  
  return (
    <div className="xl:hidden min-h-[80px]">
      {/* Deskripsi ringkas dengan clamp */}
      <p
        className={`text-white font-poppins text-justify mt-4 text-sm transition-all duration-300
          ${isLong ? "line-clamp-5" : ""}
        `}
        style={{ wordBreak: 'break-word' }}
      >
        {deskripsi}
      </p>
      {/* Tombol */}
      {isLong && (
        <button
          className="mx-2 mt-2 text-[#4c6e49] font-bold focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          Lihat Selengkapnya
        </button>
      )}

      {/* MODAL DENGAN SCROLL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#1C2029] rounded-lg shadow-lg w-full max-w-sm sm:max-w-xl mx-3 p-5 relative max-h-[70vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-white mb-4">Deskripsi Lengkap</h2>
            <div className="overflow-y-auto flex-1 mb-4">
              <p
                className="text-white font-poppins text-justify text-sm sm:text-base"
                style={{ wordBreak: 'break-word' }}
              >
                {deskripsi}
              </p>
            </div>
            <button
              className="w-full px-4 py-2 bg-[#4C6E49] text-white rounded font-semibold uppercase"
              onClick={() => setShowModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  )
}