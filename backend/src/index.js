import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;
app.listen(3000, ()=> {console.log(`Server is listening on port ${port}.`)});