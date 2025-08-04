import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import Building from "./models/building.js";
import buildingRoutes from './routes/buildings.js';
import userRoutes from './routes/users.js';
import assignRoutes from './routes/assign.js';
import User from './models/user.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/buildings', buildingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assign', assignRoutes);

app.get("/",async(req,res)=>{
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

      const users = await User.find();

      res.render("index",{formatted, users});
    } catch (error) {
      console.error('Error fetching status distribution:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
})


// MongoDB Connection
mongoose.connect("mongodb+srv://sahilkavatkar:R7YHomA0mRNYgqrN@fire.ksxvkc5.mongodb.net/?retryWrites=true&w=majority&appName=FIRE")
  .then(() => {
    app.listen(8000, () => console.log("✅ Server running on http://localhost:8000"));
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
