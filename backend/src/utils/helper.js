import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');

export function parseTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return tags.split(',').map(t => t.trim()).filter(Boolean);
  }
}

export function serializeTags(tags) {
  return JSON.stringify(Array.isArray(tags) ? tags : []);
}


export function deserializeTags(tagsStr) {
  try {
    return JSON.parse(tagsStr || '[]');
  } catch {
    return [];
  }
}


export function buildRelativePath(file) {
  const rel = file.destination.replace(UPLOAD_DIR, '').replace(/^[\\/]/, '');
  return `${rel}/${file.filename}`;
}


export function deleteFile(relativePath) {
  if (!relativePath) return;
  const fullPath = path.join(UPLOAD_DIR, relativePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}


export function formatItem(row) {
  if (!row) return null;
  return {
    ...row,
    tags: deserializeTags(row.tags),
    rating: row.rating ? parseFloat(row.rating) : null,
  };
}
