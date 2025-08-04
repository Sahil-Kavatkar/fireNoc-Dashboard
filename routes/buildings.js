
import express from 'express';
import Building from '../models/building.js';

const router = express.Router();

router.get('/under-review', async (req, res) => {
  const buildings = await Building.find({ nocStatus: 'Under Review'});
    
  res.json(buildings);
});

router.get('/rejected', async (req, res) => {
  const buildings = await Building.find({ nocStatus: 'Rejected'});
  
  res.json(buildings);
});

router.get('/approved', async (req, res) => {
  const buildings = await Building.find({ nocStatus: 'Approved'});
  
  res.json(buildings);
});

router.get('/inprocess', async (req, res) => {
  const buildings = await Building.find({ nocStatus: 'In process'});
  console.log(buildings);
  res.json(buildings);
});

router.get('/status-distribution', async (req, res) => {
  try {
    const statusCounts = await Building.aggregate([
      {
        $group: {
          _id: '$nocStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert to desired format
    const formatted = {
      'Approved': 0,
      'Under Review': 0,
      'Rejected': 0,
      'In process': 0
    };

    statusCounts.forEach(status => {
      const key = status._id;
      if (formatted.hasOwnProperty(key)) {
        formatted[key] = status.count;
      }
    });
    console.log(formatted);
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching status distribution:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
