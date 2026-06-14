import { useState, useEffect, useRef } from 'react'
import { createItem, updateItem } from '../api/catalogue'

const CATEGORIES = [
  'DVD',
  'Blu-ray',
  'Video',
  'Book',
  'eBook',
  'PDF',
  'Image',
  'Photo',
  'Other',
]

const BOOK_CATS = ['Book', 'eBook']
const DVD_CATS = ['DVD', 'Blu-ray', 'Video']
const IMAGE_CATS = ['Image', 'Photo']
const PDF_CATS = ['PDF']

const isBook = (c) => BOOK_CATS.includes(c)
const isDVD = (c) => DVD_CATS.includes(c)
const isImage = (c) => IMAGE_CATS.includes(c)
const isPDF = (c) => PDF_CATS.includes(c)

const FIELD =
  'bg-[#161616] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition-colors w-full'
const LABEL = 'block text-xs font-medium text-gray-500 mb-1.5'

const EMPTY = {
  title: '',
  category: 'DVD',
  description: '',
  tags: '',
  language: '',
  genre: '',
  duration: '',
  year: '',
  rating: '',
  author: '',
}

export default function ItemForm({ item, onClose, onSaved }) {
  const isEdit = !!item
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const mediaRef = useRef(null)
  const coverRef = useRef(null)
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || '',
        category: item.category || 'DVD',
        description: item.description || '',
        tags: Array.isArray(item.tags)
          ? item.tags.join(', ')
          : item.tags || '',
        language: item.language || '',
        genre: item.genre || '',
        duration: item.duration || '',
        year: item.year != null ? String(item.year) : '',
        rating: item.rating != null ? String(item.rating) : '',
        author: item.author || '',
      })
    } else {
      setForm(EMPTY)
    }
  }, [item])

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const fd = new FormData()
    fd.append('title', form.title.trim())
    fd.append('category', form.category)
    if (form.description) fd.append('description', form.description)
    if (form.tags) fd.append('tags', form.tags)
    if (form.language) fd.append('language', form.language)
    if (form.genre) fd.append('genre', form.genre)
    if (form.duration) fd.append('duration', form.duration)
    if (form.year) fd.append('year', form.year)
    if (form.rating) fd.append('rating', form.rating)
    if (form.author) fd.append('author', form.author)

    if (mediaRef.current?.files?.[0])
      fd.append('mediaFile', mediaRef.current.files[0])
    if (coverRef.current?.files?.[0])
      fd.append('coverImage', coverRef.current.files[0])

    try {
      const saved = isEdit
        ? await updateItem(item.id, fd)
        : await createItem(fd)
      onSaved(saved)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const cat = form.category

  const mediaAccept = isImage(cat)
    ? 'image/*'
    : isPDF(cat)
    ? '.pdf,application/pdf'
    : isDVD(cat)
    ? 'video/*'
    : '*/*'

  const mediaLabel = isImage(cat)
    ? 'Image File'
    : isPDF(cat)
    ? 'PDF File'
    : isDVD(cat)
    ? 'Video File'
    : 'Media File'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#0f0f0f] border border-[#2a2a2a] rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f] shrink-0">
          <h2 className="text-base font-bold text-yellow-400">
            {isEdit ? 'Edit Item' : 'Add New Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white text-2xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Form body */}
        <form
          id="item-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 px-6 py-5 space-y-4"
        >
          {error && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-900/50 px-3 py-2 rounded-xl">
              {error}
            </p>
          )}

          {/* Category */}
          <div>
            <label className={LABEL}>Category *</label>
            <select
              value={form.category}
              onChange={set('category')}
              className={FIELD}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className={LABEL}>Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={set('title')}
              className={FIELD}
              placeholder="Enter title"
            />
          </div>

          {/* Book-specific fields */}
          {isBook(cat) && (
            <>
              <div>
                <label className={LABEL}>Author</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={set('author')}
                  className={FIELD}
                  placeholder="Author name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Year Published</label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={set('year')}
                    className={FIELD}
                    placeholder="e.g. 2021"
                    min="1000"
                    max="2099"
                  />
                </div>
                <div>
                  <label className={LABEL}>Rating (0–10)</label>
                  <input
                    type="number"
                    value={form.rating}
                    onChange={set('rating')}
                    className={FIELD}
                    placeholder="e.g. 8.5"
                    min="0"
                    max="10"
                    step="0.1"
                  />
                </div>
              </div>
            </>
          )}

          {/* DVD-specific fields */}
          {isDVD(cat) && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Year</label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={set('year')}
                    className={FIELD}
                    placeholder="e.g. 2022"
                    min="1888"
                    max="2099"
                  />
                </div>
                <div>
                  <label className={LABEL}>Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={set('duration')}
                    className={FIELD}
                    placeholder="e.g. 2h 15m"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Genre</label>
                  <input
                    type="text"
                    value={form.genre}
                    onChange={set('genre')}
                    className={FIELD}
                    placeholder="e.g. Action"
                  />
                </div>
                <div>
                  <label className={LABEL}>Rating (0–10)</label>
                  <input
                    type="number"
                    value={form.rating}
                    onChange={set('rating')}
                    className={FIELD}
                    placeholder="e.g. 7.5"
                    min="0"
                    max="10"
                    step="0.1"
                  />
                </div>
              </div>
            </>
          )}

          {/* Language — all categories */}
          <div>
            <label className={LABEL}>Language</label>
            <input
              type="text"
              value={form.language}
              onChange={set('language')}
              className={FIELD}
              placeholder="e.g. English"
            />
          </div>

          {/* Description */}
          <div>
            <label className={LABEL}>Description</label>
            <textarea
              value={form.description}
              onChange={set('description')}
              className={`${FIELD} resize-none h-20`}
              placeholder="Brief description…"
            />
          </div>

          {/* Tags */}
          <div>
            <label className={LABEL}>Tags (comma separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={set('tags')}
              className={FIELD}
              placeholder="e.g. classic, thriller, 2022"
            />
          </div>

          {/* Cover image — available for all categories */}
          <div>
            <label className={LABEL}>Cover Image <span className="text-gray-700">(optional)</span></label>
            {item?.coverImage && (
              <p className="text-xs text-gray-600 mb-1.5 truncate">
                Current: {item.coverImage}
              </p>
            )}
            <input
              type="file"
              ref={coverRef}
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:text-xs file:font-semibold file:cursor-pointer hover:file:bg-yellow-300 transition-colors"
            />
          </div>

          {/* Media file */}
          <div>
            <label className={LABEL}>{mediaLabel}</label>
            {item?.mediaFile && (
              <p className="text-xs text-gray-600 mb-1.5 truncate">
                Current: {item.mediaFile}
              </p>
            )}
            <input
              type="file"
              ref={mediaRef}
              accept={mediaAccept}
              className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#2a2a2a] file:text-gray-300 file:text-xs file:font-medium file:cursor-pointer hover:file:bg-[#333] transition-colors"
            />
          </div>

          {/* Spacer */}
          <div className="h-1" />
        </form>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#1f1f1f] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#2a2a2a] text-gray-500 hover:text-white hover:border-gray-600 transition-all text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="item-form"
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  )
}
