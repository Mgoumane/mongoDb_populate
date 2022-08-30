const mongoose = require('mongoose');
const Person = require('./models/Person');
const Story = require('./models/Story');
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