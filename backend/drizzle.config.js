import { defineConfig } from  "drizzle-kit"
import "dotenv/config"

export default defineConfig( {
    out: "./drizzle",
    schema: "./models/catalogue.model.js",
    dialect: "postgresql",
    dbCredentials: { 
        url: process.env.DATABASE_URL,

     }
})