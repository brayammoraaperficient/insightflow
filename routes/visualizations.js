const express = require('express');
const router = express.Router();

// GET /visualizations/:dataset_id
router.get('/:dataset_id', (req, res) => {
  console.log(`[visualizations] dataset_id:`, req.params.dataset_id);
  res.json({ message: 'Visualization for dataset', dataset_id: req.params.dataset_id });
});

module.exports = router;
