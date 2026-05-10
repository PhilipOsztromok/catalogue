import express from 'express';
import { upload, handleMulterError } from '../middlewares/upload.js';
import {
  createItem,
  updateItem,
  getItems,
  getItemById,
  deleteItem,
} from '../controller/catalogue.controller.js';

const router = express.Router();

const uploadFields = upload.fields([
  { name: 'mediaFile',  maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
]);


router.get('/',      getItems);
router.get('/:id',   getItemById);
router.post('/',     uploadFields, handleMulterError, createItem);
router.put('/:id',   uploadFields, handleMulterError, updateItem);
router.delete('/:id', deleteItem);


export default router;