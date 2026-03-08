import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import "dotenv-config";
import itemRouter from './src/routes/catalougue.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;
app.listen(3000, ()=> {console.log(`Server is listening on port ${port}.`)});

mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => 
    console.log('✅ MongoDB connected'))
 .catch
    (err => { console.error('❌ MongoDB error:', err); process.exit(1); }
);

app.use("/uploads", itemRouter);

const upload = path.join("_dirname", "uploads");
["dvds", "books", "cds", "pdfs", "mp3s"].forEach(
    (element)=> {
        fs.mkdirSync(path.join(upload,element));
    }, {
        recursive:true
    }
);

// multer storage
const storage = multer.diskStorage( {
    destination:  (req,file,cb) => {
        const cat=(req.body.category || "others").tolowercase();
        if (["dvds","video","mp4","bluray"].includes(cat)) 
            folder="dvds";
        else if  (["pdf","books","ebook"].includes(cat)) 
            folder="books";
        else if (["image","photo","jpeg","raw"].includes(cat)) 
            folder="images";
        cb(null, path.join(upload,folder));
    },
    filename: (req,file,cb) => {
        const unique = Date.now() + "-" + Math.random() * 10000;
         cb(null, unique + path.extname(file.originalname()));
    },
} );

const uploadSize = multer({ storage, limits: {filesize:5 * 1024 * 1024 * 1024 } });


