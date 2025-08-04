// routes/users.js
import express from 'express';
import User from '../models/user.js';
import '../models/building.js';

const router = express.Router();

router.get('/officers', async (req, res) => {
  try {
    const officers = await User.find()
      .populate({
        path: 'assignedBuildings',
        model: 'Building'
      });

    const filteredOfficers = officers.filter(officer => {
      return officer.assignedBuildings.length === 0 || 
            officer.assignedBuildings.every(building => building.nocStatus !== 'In process');
    });

    res.json(filteredOfficers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
