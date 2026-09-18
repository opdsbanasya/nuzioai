import express from 'express';
import { getNews, seedNews } from '../controllers/news.controller.js';

const router = express.Router();

router.get('/', getNews);
router.post('/seed', seedNews);

export default router;
