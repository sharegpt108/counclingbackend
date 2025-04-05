const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./db/db');
const path = require('path')
const enquiryRoutes = require('./routes/enquiry.routes');
const registerRoutes = require('./routes/register.routes');

connectDB();

const app = express();

app.use(cors({
    origin: ["https://counclingfrontend.vercel.app/", "http://localhost:5173"], // Use the exact frontend URL without '/'
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/enquiry', enquiryRoutes);
app.use('/api/register', registerRoutes);

app.get("*", (req, res) => {
    res.send("hi");
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});