import { json } from 'node:stream/consumers';
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

export function parseTags(tag) {
    if(!tag) return [];
    if(Array.isArray(tag))
        return tag;
    try {
        const parse = JSON.parse(tag);
        return Array.isArray(parse) ? parse : [];
    } catch (error) {
        return tag.split(",").map((element) => 
            element.trim()
        )
    }
}

export function serializeTags(tag) {
    return JSON.stringify(Array.isArray(tag) ? tag : [] );
}

export function deserializeTags(tag) {
    try {
        return JSON.parse(tag || "[]");
    } catch (error) {
        return [];
    }
}