import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import FilterBar from './components/FilterBar'
import ItemCard from './components/ItemCard'
import ItemForm from './components/ItemForm'
import ItemDetail from './components/ItemDetail'
import { fetchItems, deleteItem } from './api/catalogue'

export default function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [viewItem, setViewItem] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchItems({ search, category })
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [search, category])

  useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0)
    return () => clearTimeout(t)
  }, [load, search])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return
    try {
      await deleteItem(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
      if (viewItem?.id === id) setViewItem(null)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleSaved = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = item
        return next
      }
      return [item, ...prev]
    })
    setShowForm(false)
    setEditItem(null)
  }

  const openEdit = (item) => {
    setViewItem(null)
    setEditItem(item)
    setShowForm(true)
  }

  const openAdd = () => {
    setEditItem(null)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar search={search} onSearch={setSearch} onAdd={openAdd} />
      <FilterBar active={category} onChange={setCategory} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-[3px] border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={load}
              className="px-4 py-2 bg-yellow-400 text-black text-sm font-semibold rounded-xl hover:bg-yellow-300 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-400 text-lg font-medium mb-1">
              {search || category !== 'All' ? 'No results found' : 'Your catalogue is empty'}
            </p>
            <p className="text-gray-600 text-sm mb-6">
              {search || category !== 'All'
                ? 'Try a different search or filter'
                : 'Start by adding your first DVD, book, or file'}
            </p>
            {!search && category === 'All' && (
              <button
                onClick={openAdd}
                className="px-6 py-2.5 bg-yellow-400 text-black font-bold text-sm rounded-xl hover:bg-yellow-300 transition"
              >
                + Add First Item
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && items.length > 0 && (
          <>
            <p className="text-xs text-gray-600 mb-4">
              {items.length} item{items.length !== 1 ? 's' : ''}
              {category !== 'All' ? ` · ${category}` : ''}
              {search ? ` · "${search}"` : ''}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onView={() => setViewItem(item)}
                  onEdit={() => openEdit(item)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {showForm && (
        <ItemForm
          item={editItem}
          onClose={() => {
            setShowForm(false)
            setEditItem(null)
          }}
          onSaved={handleSaved}
        />
      )}

      {viewItem && (
        <ItemDetail
          item={viewItem}
          onClose={() => setViewItem(null)}
          onEdit={() => openEdit(viewItem)}
        />
      )}
    </div>
  )
}
