const express = require('express');
const { getAllSubscriptions, addSubscription, deleteSubscription } = require('../controllers/adminController');

const router = express.Router();

router.get('/subscriptions', getAllSubscriptions);
router.post('/subscriptions', addSubscription);
router.delete('/subscriptions/:email', deleteSubscription);

module.exports = router;
