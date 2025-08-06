const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// POST /data/upload
router.post('/upload', upload.single('file'), (req, res) => {
  console.log(`[data/upload] file:`, req.file);
  res.json({ message: 'File uploaded successfully', file: req.file });
});

module.exports = router;
