import { db } from '../db/index.js';
import { items } from '../models/catalogue.model.js';
import { eq, ilike } from 'drizzle-orm';
import { deleteFile } from '../utils/helper.js';

export const createItems = async ( req,res,next ) => {
    try {
        const data = { ...req.body }
        const newItem = { 
            title: data.title,
            category: data.category,
            description: data.description || '',
         }
    const [ created ] = await db.insert(items).values(newItem).returning()

    res.status(201).json( { created, message:"Item inserted sucessfully!" } )

    } catch (error) {
        next(error);
    }
}

export const updateItems = async ( req,res,next ) => {
    try {
        const data = { ...req.body }
        const id = { ...req.params }
        const existing = await db.select().from(items).where(eq(items.id, id) );
        const updates = {updatedAt: new Date() };
        if ( !existing ) return res.status(404).json({ message:"Item not found!" });
        if ( data.title !==undefined) updates.title=data.title;
        if ( data.category !==undefined) updates.category=data.category;
        if ( data.description !==undefined) updates.description=data.description;
        if ( req.files?.mediaFile[0] ) {
            deleteFile(existing.mediaFile)
            updates.mediaFile = buildRelativePath(req.files.mediaFile[0])
        }

        const [updated] = await db.update(items).set(updates).where(eq(items.id, id)).returning();


    } catch (error) {
        next(error);
    }

}

export const getAllItems = async ( req,res, next ) => {
    try {
        
        const { category, search } = req.query;
        // const search = req.category.search;
        let results = [];
        if (category && category !== "All" ) {
            results.push(eq(items.category, category))
        }

        if (search) {
            results.push(or 
                (ilike(items.title,`%${ search }%`)),
                (ilike(items.description,`%${ search }%`)),
                (ilike(items.genre,`%${ search }%`)),
            );
        }

    } catch (error) {
        next(error);
    }
}