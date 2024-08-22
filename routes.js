const express = require('express')
const sensorController = require('./controllers/sensorControllers.js');
const sampleController = require('./controllers/sampleController.js');

const router = express.Router(); 

// Sample router
router.get('/sample', sampleController.index);
router.post('/sample', sampleController.store);
router.get('/sample/:id', sampleController.show);
router.delete('/sample/:id', sampleController.destroy);


// Sensor router 
router.get('/sensor', sensorController.index);
router.post('/sensor', sensorController.store);
router.get('/sensor/:id', sensorController.show);


module.exports = router 