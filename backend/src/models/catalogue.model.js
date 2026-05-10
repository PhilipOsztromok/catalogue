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
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  numeric
} from "drizzle-orm/pg-core";

export const items = pgTable("items", {
   id:          serial('id').primaryKey(),
  title:       varchar('title', { length: 255 }).notNull(),
  category:    varchar('category', { length: 100 }).notNull(),
  description: text('description').default(''),
  tags:        text('tags').default('[]'),          
  mediaFile:   text('media_file').default(''),
  coverImage:  text('cover_image').default(''),
  duration:    varchar('duration', { length: 50 }).default(''),
  year:        integer('year'),
  rating:      numeric('rating', { precision: 3, scale: 1 }),
  genre:       varchar('genre', { length: 100 }).default(''),
  language:    varchar('language', { length: 100 }).default(''),

  addedAt:     timestamp('added_at').defaultNow(),
  updatedAt:   timestamp('updated_at').defaultNow(),
});
 
