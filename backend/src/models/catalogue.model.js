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

import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

const itemsTable = pgTable("items", { 
    id: uuid().primaryKey(),
    category: varchar( { length: 45 } ).notNull(),
    tags: text().default(" "),
})

export default itemsTable;