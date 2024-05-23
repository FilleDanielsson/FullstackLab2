const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require("express")
const cors = require('cors');
const projectAssignmentRoutes = require('./routes/route');



const app = express()
const PORT = process.env.PORT || 3000
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(cors());
app.use(express.json())
app.use(express.static("dist"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(projectAssignmentRoutes);

app.listen(PORT, () => {
    console.log("Listening to active port: " + PORT)
})