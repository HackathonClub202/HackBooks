const express = require('express');
const { getAllSubscriptions, addSubscription, deleteSubscription } = require('../controllers/adminController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage
const { uploadBulkUsers } = require('../controllers/adminController');
const router = express.Router();

router.get('/subscriptions', getAllSubscriptions);
router.post('/subscriptions', addSubscription);
router.delete('/subscriptions/:email', deleteSubscription);
router.post('/bulk-upload', upload.single('file'), uploadBulkUsers);

module.exports = router;
