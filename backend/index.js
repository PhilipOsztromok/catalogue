import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import "dotenv/config";
import { errorHandler, notFound } from './src/middlewares/error_handler.js';
import itemRouter from './src/routes/catalougue.routes.js';
import { UPLOAD_DIR } from './src/utils/helper.js';


const app= express()
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(UPLOAD_DIR));

app.use('/api/items', itemRouter);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

