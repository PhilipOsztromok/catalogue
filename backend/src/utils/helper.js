import {upload} from '../middleware/upload.js'

export function deleteFile(path) {
    if (!path) return;
    const fullPath = path.join(upload,path);
    if (fs.exist(fullPath)) {
        fs.unlink(fullPath)
    }
}

export function buildRelativePath(file) {
  const rel = file.destination.replace(upload,'').replace(/^[\\/]/, '');
  return `${rel}/${file.filename}`;
}
