export default function Navbar({ search, onSearch, onAdd }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-yellow-400 text-2xl">🗂️</span>
          <span className="text-yellow-400 font-bold text-lg tracking-wide hidden sm:block">
            Catalogue
          </span>
        </div>

        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by title, genre, tags…"
            className="w-full max-w-md bg-[#161616] border border-[#2a2a2a] rounded-xl px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>

        <button
          onClick={onAdd}
          className="shrink-0 flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-semibold text-sm rounded-xl hover:bg-yellow-300 active:scale-95 transition-all"
        >
          <span className="text-lg leading-none">+</span>
          <span className="hidden sm:block">Add Item</span>
        </button>
      </div>
    </header>
  )
}
