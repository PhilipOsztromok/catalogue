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

// import { timestamp } from "drizzle-orm/gel-core";
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  numeric,
  timestamp
} from "drizzle-orm/pg-core";

export const items = pgTable("items", {
   id:          serial('id').primaryKey(),
  title:       varchar('title', { length: 255 }).notNull(),
  category:    varchar('category', { length: 100 }).notNull(),
  description: text('description').default(''),
  tags:        text('tags').default('[]'),          
  mediaFile:   text('media_file').default(''),
  coverImage:  text('cover_image').default(''),
  language:    varchar('language', { length: 100 }).default(''),

  addedAt:     timestamp('added_at').defaultNow(),
  updatedAt:   timestamp('updated_at').defaultNow(),
});

export const book_details = pgTable("book_details", {
   id:          serial('id').primaryKey(),
   book_id:     integer().references(() => items.id ).notNull().unique(),
   author:      varchar("Name").notNull(),
   isbn_code:   varchar("ISBN"),
   pages:       integer("Pages")
});

export const cd_details = pgTable("cd_details", {
   id:          serial('id').primaryKey(),
   cd_id:       integer().references(() => items.id ).notNull().unique(),
   artist:      varchar().notNull(),
   
});

export const dvd_details = pgTable("dvd_details", {
   id:          serial('id').primaryKey(),
   dvd_id:      integer().references(() => items.id ).notNull().unique(),
   year:        integer(),
   type:        varchar()  // dvd or bluray!
});