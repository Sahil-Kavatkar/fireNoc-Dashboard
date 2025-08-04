// routes/assign.js
import express from 'express';
import User from '../models/user.js';
import Building from '../models/building.js';

const router = express.Router();

router.post('/officer', async (req, res) => {
  const { officerId, buildingId } = req.body;
  console.log(`Assigning officer ${officerId} to building ${buildingId}`);
  try {
    // Add building to officer
    await User.findByIdAndUpdate(officerId, { $push: { assignedBuildings: buildingId } });

    // Assign officer to building + update status
    await Building.findByIdAndUpdate(buildingId, {
    //   assignedInspectorId: officerId,
      nocStatus: 'In process',
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export default router;
