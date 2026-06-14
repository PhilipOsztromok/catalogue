const BASE = '/api/items'

export async function fetchItems(params = {}) {
  const q = new URLSearchParams()
  if (params.category && params.category !== 'All') q.set('category', params.category)
  if (params.search) q.set('search', params.search)
  const res = await fetch(`${BASE}?${q}`)
  if (!res.ok) throw new Error('Failed to fetch items')
  return res.json()
}

export async function fetchItem(id) {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error('Failed to fetch item')
  return res.json()
}

export async function createItem(formData) {
  const res = await fetch(BASE, { method: 'POST', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to create item')
  }
  return res.json()
}

export async function updateItem(id, formData) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', body: formData })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Failed to update item')
  }
  return res.json()
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete item')
  return res.json()
}
