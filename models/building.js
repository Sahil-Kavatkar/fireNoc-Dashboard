import mongoose from 'mongoose'

const buildingSchema = new mongoose.Schema({
  buildingId :String,
  name: { type: String, required: true },
  address: {
    street: String,
    area: String,
    city: String,
    state: String,
    pincode: String
  },
  type: {
    type: String,
    enum: ['Residential', 'Commercial', 'Industrial', 'Institutional', 'Hospital'],
    required: true
  },
  totalFloors: { type: Number, required: true },
  builtUpAreaSqFt: { type: Number, required: true },
  occupancyLoad: { type: Number, required: true }, // Total people that occupy the building
  hasBasement: { type: Boolean, default: false },
  fireSafetySystems: {
    extinguisherPerFloor: { type: Boolean, required: true },
    fireAlarmSystem: { type: Boolean, required: true },
    smokeDetectors: { type: Boolean, required: true },
    sprinklerSystem: { type: Boolean, required: true },
    emergencyLighting: { type: Boolean, required: true },
    fireLift: { type: Boolean },
    fireEscapeStaircase: { type: Boolean, required: true },
    refugeAreaAvailable: { type: Boolean },
    pumpRoomPresent: { type: Boolean, required: true }
  },
  lastFireDrillDate: { type: Date },
  nocStatus: {
    type: String,
    enum: ['In process', 'Under Review', 'Approved', 'Rejected', 'Expired'],
    default: 'Not Applied'
  },
  nocExpiryDate: { type: Date },
  assignedInspectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspector' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Building', buildingSchema);
