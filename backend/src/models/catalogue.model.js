/* import mongoose from 'mongoose';

const catalogueSchema = new mongoose.Schema( {
    title: { type:String, required:true },
    category: { type:String, required:true },
    description: { type:String, default: "" },
    tags: [ { type:String } ],
    file: { type:String, default:"", path:"" },
    rating: { type:String, required:true },
}, {
    timestamp: true,
});

const catalogue = mongoose.model("item", catalogueSchema); */

import { timestamp } from "drizzle-orm/gel-core";
import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

const items = pgTable("items", { 
    id: uuid().primaryKey(),
    title: varchar( { length: 100 } ),
    description: text().default(" "),
    category: varchar( { length: 45 } ).notNull(),
    tags: text().default("[]"),
    filepath: text().default(""),
    addedAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
})

export default items;