import { db } from "../db/index.js";
import { items } from "../models/catalogue.model.js";
import { eq, ilike, or, sql } from "drizzle-orm";
import {
  parseTags,
  serializeTags,
  buildRelativePath,
  deleteFile,
  formatItem,
} from "../utils/helper.js";

export const createItem = async (req, res, next) => {
  try {
    const data = { ...req.body };

    const newItem = {
      title: data.title,
      category: data.category,
      description: data.description || "",
      tags: serializeTags(parseTags(data.tags)),
      duration: data.duration || "",
      year: data.year ? parseInt(data.year, 10) : null,
      rating: data.rating != null ? parseFloat(data.rating) : null,
      genre: data.genre || "",
      language: data.language || "",
      mediaFile: req.files?.mediaFile?.[0]
        ? buildRelativePath(req.files.mediaFile[0])
        : "",
      coverImage: req.files?.coverImage?.[0]
        ? buildRelativePath(req.files.coverImage[0])
        : "",
    };

    //--------------added this line and few things in schema
    const [created] = await db.insert(items).values(newItem).returning();
    res.status(201).json(formatItem(created));
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    const [existing] = await db
      .select()
      .from(items)
      .where(eq(items.id, parseInt(id)));
    if (!existing) return res.status(404).json({ error: "Not found" });

    const updates = {
      updatedAt: new Date(),
    };

    if (data.title !== undefined) updates.title = data.title;
    if (data.category !== undefined) updates.category = data.category;
    if (data.description !== undefined) updates.description = data.description;
    if (data.tags !== undefined)
      updates.tags = serializeTags(parseTags(data.tags));
    if (data.duration !== undefined) updates.duration = data.duration;
    if (data.year !== undefined)
      updates.year = data.year ? parseInt(data.year, 10) : null;
    if (data.rating !== undefined)
      updates.rating = data.rating != null ? parseFloat(data.rating) : null;
    if (data.genre !== undefined) updates.genre = data.genre;
    if (data.language !== undefined) updates.language = data.language;

    if (req.files?.mediaFile?.[0]) {
      deleteFile(existing.mediaFile);
      updates.mediaFile = buildRelativePath(req.files.mediaFile[0]);
    }
    if (req.files?.coverImage?.[0]) {
      deleteFile(existing.coverImage);
      updates.coverImage = buildRelativePath(req.files.coverImage[0]);
    }

    const [updated] = await db
      .update(items)
      .set(updates)
      .where(eq(items.id, parseInt(id)))
      .returning();

    res.json(formatItem(updated));
  } catch (err) {
    next(err);
  }
};

export async function getItems(req, res, next) {
  try {
    const { category, search } = req.query;

    let conditions = [];

    if (category && category !== 'All') {
      conditions.push(eq(items.category, category));
    }

    if (search) {
      conditions.push(
        or(
          ilike(items.title,       `%${search}%`),
          ilike(items.description, `%${search}%`),
          ilike(items.genre,       `%${search}%`),
          ilike(items.tags,        `%${search}%`),
        )
      );
    }

    const rows = conditions.length
      ? await db.select().from(items).where(sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}`)
      : await db.select().from(items);

    res.json(rows.map(formatItem));
  } catch (err) {
    next(err);
  }
}

export async function getItemById(req, res, next) {
  try {
    const { id } = req.params;
    const [item] = await db.select().from(items).where(eq(items.id, parseInt(id)));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(formatItem(item));
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    const [deleted] = await db
      .delete(items)
      .where(eq(items.id, parseInt(id)))
      .returning();

    if (!deleted) return res.status(404).json({ error: 'Not found' });

    deleteFile(deleted.mediaFile);
    deleteFile(deleted.coverImage);

    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}


