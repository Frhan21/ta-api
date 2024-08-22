// controllers/sampleController.js
const db = require('../db');

// Get all samples
exports.index = async (req, res) => {
  try {
    const [samples] = await db.query('SELECT * FROM sample');
    res.json(samples);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
};

// Create a new sample
exports.store = async (req, res) => {
  const { average_intensity, average_voltage, absorbance, concentration } = req.body;

  if (!average_intensity || !average_voltage || !absorbance || !concentration) {
    return res.status(400).json({ error: 'Validation error: Missing required fields' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO sample (average_intensity, average_voltage, absorbance, concentration) VALUES (?, ?, ?, ?)',
      [average_intensity, average_voltage, absorbance, concentration]
    );

    const [newSample] = await db.query('SELECT * FROM sample WHERE id = ?', [result.insertId]);
    res.status(200).json(newSample[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
};

// Get a specific sample by ID
exports.show = async (req, res) => {
  const { id } = req.params;

  try {
    const [sample] = await db.query('SELECT * FROM sample WHERE id = ?', [id]);
    if (sample.length > 0) {
      res.json(sample[0]);
    } else {
      res.status(404).json([]);
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
};

// Delete a sample by ID
exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const [sample] = await db.query('SELECT * FROM sample WHERE id = ?', [id]);
    if (sample.length > 0) {
      await db.query('DELETE FROM Sample WHERE id = ?', [id]);
      res.json({ status: 'success', message: 'Data berhasil dihapus' });
    } else {
      res.status(400).json({ status: 'failed', message: 'No Data!' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error: ' + err.message });
  }
};
