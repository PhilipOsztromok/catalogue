import express from 'express';

const router = express.Router();

router.post("/api/item", uploadFiles);


export default router;