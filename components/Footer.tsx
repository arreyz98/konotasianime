export default function Footer() {
  return (
    <footer className="mt-auto w-full h-[70px] py-6 px-6 border-t border-zinc-800 bg-[#272727] text-zinc-400 text-sm text-center">
      <p className="text-base">
        &copy; {new Date().getFullYear()}{' '}
        <span className="text-white font-semibold">Norinime</span>.
      </p>
    </footer>
  )
}
