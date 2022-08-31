const mongoose = require('mongoose');
const Person = require('./models/Person');
const Story = require('./models/Story');
const studentModel = require("./models/Students");
const addressModel = require("./models/Addresses");
mongoose.connect(
    "mongodb://localhost:27017/populate",
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('DB connectée');
    }
)
// Ma première jointure
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
});

// Serveur Back-end:
const express = require("express");
const port = 8000;
const app = express();
app.listen(port, () => {
  console.log("Serveur lancé");
});
app.get("/students", async (req, res) => {
  const students = await studentModel.find().populate("address").lean().exec();
  res.send(students);
});