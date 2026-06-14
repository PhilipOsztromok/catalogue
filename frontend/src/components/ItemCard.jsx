const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280'%3E%3Crect width='200' height='280' fill='%23161616'/%3E%3Ctext x='100' y='140' font-family='sans-serif' font-size='13' fill='%23444' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E"

const BADGE = {
  DVD: 'bg-blue-950 text-blue-400 border-blue-800',
  'Blu-ray': 'bg-purple-950 text-purple-400 border-purple-800',
  Video: 'bg-indigo-950 text-indigo-400 border-indigo-800',
  Book: 'bg-emerald-950 text-emerald-400 border-emerald-800',
  eBook: 'bg-teal-950 text-teal-400 border-teal-800',
  PDF: 'bg-red-950 text-red-400 border-red-800',
  Image: 'bg-pink-950 text-pink-400 border-pink-800',
  Photo: 'bg-rose-950 text-rose-400 border-rose-800',
  Other: 'bg-zinc-900 text-zinc-400 border-zinc-700',
}

export default function ItemCard({ item, onView, onEdit, onDelete }) {
  const imgSrc = item.coverImage ? `/uploads/${item.coverImage}` : PLACEHOLDER
  const badge = BADGE[item.category] || BADGE.Other

  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden flex flex-col group hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/5 transition-all duration-200">
      {/* Cover */}
      <div
        className="relative aspect-[2/3] overflow-hidden cursor-pointer bg-[#161616]"
        onClick={onView}
      >
        <img
          src={imgSrc}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = PLACEHOLDER
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
          <span className="text-yellow-400 text-xs font-semibold tracking-wide">
            VIEW DETAILS
          </span>
        </div>
        <span
          className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-semibold border ${badge}`}
        >
          {item.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <h3
          className="text-sm font-semibold text-white truncate leading-snug"
          title={item.title}
        >
          {item.title}
        </h3>

        {item.author && (
          <p className="text-xs text-gray-400 truncate">by {item.author}</p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {item.year && (
            <span className="text-xs text-gray-600">{item.year}</span>
          )}
          {item.rating && (
            <span className="text-xs text-yellow-400 font-medium">
              ★ {item.rating}
            </span>
          )}
          {item.genre && (
            <span className="text-xs text-gray-600 truncate">{item.genre}</span>
          )}
        </div>

        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {item.tags.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="text-[10px] bg-[#1f1f1f] text-gray-500 px-1.5 py-0.5 rounded-md"
              >
                {t}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-[10px] text-gray-600">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-auto pt-3">
          <button
            onClick={onEdit}
            className="flex-1 text-xs py-1.5 rounded-lg bg-[#1f1f1f] text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all font-medium"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 text-xs py-1.5 rounded-lg bg-[#1f1f1f] text-red-500 hover:bg-red-950 hover:text-red-300 transition-all font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
