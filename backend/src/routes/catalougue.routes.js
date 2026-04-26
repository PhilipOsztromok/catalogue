import express from 'express';
import { updateItems } from '../controller/catalogue.controller.js';

const router = express.Router();

router.post("/upload", updateItems);


export default router;