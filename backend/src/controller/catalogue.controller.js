import { db } from '../db/index.js';
import { items } from '../models/catalogue.model.js';

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
        
    } catch (error) {
        
    }
}