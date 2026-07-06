import express from 'express';
import { handleGenerateShortURL, handleGetAnalytics, handleRedirectFromShortURL } from '../controllers/url.js';

const router = express.Router();

router.post('/', handleGenerateShortURL);
router.get('/:shortId', handleRedirectFromShortURL);
router.get('/analytics/:shortId', handleGetAnalytics);

export default router;