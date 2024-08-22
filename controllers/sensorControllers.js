// controllers/sensorController.js
const db = require('../db');

// Get all sensors or sensors by sample_id
exports.index = async (req, res) => {
  const sampleId = req.query.sample_id;

  try {
    let sensors;
    if (sampleId) {
      // Get sensors based on sample_id
      [sensors] = await db.query('SELECT * FROM sensor_data WHERE sample_id = ?', [sampleId]);
    } else {
      // Get all sensors if no sample_id is provided
      [sensors] = await db.query('SELECT * FROM sensor_data');
    }
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
};

// Store new sensors
exports.store = async (req, res) => {
  const { uv_reading, v_reading } = req.body;

  if (!Array.isArray(uv_reading) || !Array.isArray(v_reading)) {
    return res.status(400).json({ error: 'Validation error: uv_reading and v_reading should be arrays' });
  }

  try {
    // Get the max sample_id from the sample table
    const [[{ id: sampleId }]] = await db.query('SELECT MAX(id) AS id FROM sample');

    const insertPromises = uv_reading.map((uv, index) => {
      return db.query(
        'INSERT INTO sensor_data (sample_id, uv_reading, v_reading) VALUES (?, ?, ?)',
        [sampleId, uv, v_reading[index]]
      );
    });

    await Promise.all(insertPromises);
    
    res.status(200).json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
};

// Get a specific sensor by ID
exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const [sensor] = await db.query('SELECT * FROM sensor_data WHERE id = ?', [id]);
    if (sensor.length > 0) {
      res.status(200).json({ status: 'Success', data: sensor[0] });
    } else {
      res.status(400).json({ status: 'Failed', data: [] });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
};
