import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UPLOAD_DIR } from '../utils/helper.js';

['dvds', 'books', 'images', 'others'].forEach(folder => {
  fs.mkdirSync(path.join(UPLOAD_DIR, folder), { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const cat = (req.body.category || 'others').toLowerCase();
    let folder = 'others';
    if (['dvd', 'blu-ray', 'video'].includes(cat)) folder = 'dvds';
    else if (['book', 'pdf', 'ebook'].includes(cat)) folder = 'books';
    else if (['image', 'photo'].includes(cat)) folder = 'images';
    cb(null, path.join(UPLOAD_DIR, folder));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
});

export function handleMulterError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  next(err);
}
