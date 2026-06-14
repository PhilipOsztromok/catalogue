const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280'%3E%3Crect width='200' height='280' fill='%23161616'/%3E%3Ctext x='100' y='140' font-family='sans-serif' font-size='13' fill='%23444' text-anchor='middle' dominant-baseline='middle'%3ENo Cover%3C/text%3E%3C/svg%3E"

function Row({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div>
      <p className="text-xs text-gray-600 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm text-gray-200">{value}</p>
    </div>
  )
}

export default function ItemDetail({ item, onClose, onEdit }) {
  const imgSrc = item.coverImage ? `/uploads/${item.coverImage}` : PLACEHOLDER
  const mediaHref = item.mediaFile ? `/uploads/${item.mediaFile}` : null

  const isImage = ['Image', 'Photo'].includes(item.category)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f] shrink-0">
          <span className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">
            {item.category}
          </span>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white text-2xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="flex gap-6">
            {/* Cover image */}
            <div className="shrink-0 w-36">
              <img
                src={imgSrc}
                alt={item.title}
                className="w-full rounded-xl object-cover shadow-xl border border-[#2a2a2a]"
                onError={(e) => {
                  e.target.src = PLACEHOLDER
                }}
              />
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4 min-w-0">
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">
                  {item.title}
                </h2>
                {item.author && (
                  <p className="text-sm text-gray-400 mt-1">by {item.author}</p>
                )}
              </div>

              {item.description && (
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <Row label="Year" value={item.year} />
                <Row label="Genre" value={item.genre} />
                <Row label="Duration" value={item.duration} />
                <Row label="Language" value={item.language} />
                <Row
                  label="Rating"
                  value={item.rating ? `★ ${item.rating} / 10` : null}
                />
              </div>

              {item.tags?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#1f1f1f] border border-[#2a2a2a] text-gray-300 px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Media preview / link */}
              {isImage && item.mediaFile && (
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                    Image
                  </p>
                  <img
                    src={`/uploads/${item.mediaFile}`}
                    alt="media"
                    className="max-h-48 rounded-xl object-contain border border-[#2a2a2a]"
                  />
                </div>
              )}

              {!isImage && mediaHref && (
                <a
                  href={mediaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 hover:underline transition-colors"
                >
                  Open media file ↗
                </a>
              )}

              <p className="text-xs text-gray-700">
                Added{' '}
                {item.addedAt
                  ? new Date(item.addedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 shrink-0">
          <button
            onClick={onEdit}
            className="w-full py-2.5 bg-yellow-400 text-black font-bold text-sm rounded-xl hover:bg-yellow-300 active:scale-[0.99] transition-all"
          >
            Edit Item
          </button>
        </div>
      </div>
    </div>
  )
}
