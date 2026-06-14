const CATEGORIES = [
  { label: 'All', icon: '🗂️' },
  { label: 'DVD', icon: '💿' },
  { label: 'Blu-ray', icon: '💽' },
  { label: 'Video', icon: '🎬' },
  { label: 'Book', icon: '📚' },
  { label: 'eBook', icon: '📖' },
  { label: 'PDF', icon: '📄' },
  { label: 'Image', icon: '🖼️' },
  { label: 'Photo', icon: '📷' },
  { label: 'Other', icon: '📦' },
]

export default function FilterBar({ active, onChange }) {
  return (
    <div className="sticky top-16 z-30 bg-[#0a0a0a] border-b border-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
          {CATEGORIES.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                active === label
                  ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
                  : 'text-gray-500 hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              <span className="text-xs">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
