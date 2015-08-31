/**
 * Statics router.
 */
import express from 'express';
const router = express.Router();

/**
 * GET: Index
 */
router.get('/', (req, res) => {
  res.render('static/index');
});

export default router;
