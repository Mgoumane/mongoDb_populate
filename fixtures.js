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

// 1ère Méthode de création: 
// const author = new Person({
//     _id: new mongoose.Types.ObjectId(),
//     name: 'Ian Fleming',
//     age: 50
// });
// author.save(function (err) {
//     if (err) return handleError(err);
  
//     const story1 = new Story({
//       title: 'Casino Royale',
//       author: author._id    // assign the _id from the person
//     });
  
//     story1.save(function (err) {
//       if (err) return handleError(err);
//       // that's it!
//     });
// });

// 2ème méthode : 

const createAddresses = async () => {
  await addressModel.deleteMany({}).exec();
  const result = await addressModel.create([
      {
        streetName: "rue de la reunion",
        streetNumber: 15,
        postalCode: 75020,
        city: "Paris",
      },
      {
        streetName: "rue des chevaux rouges",
        streetNumber: 42,
        postalCode: 01023,
        city: "La bas",
      },
      {
        streetName: "rue Bruneseau",
        streetNumber: 2,
        postalCode: 75013,
        city: "Paris",
      },
    ]);
    console.log(result);
    const rueDeLaReunionAddress = result[0]._id;
    const laBasAddress = result[1]._id;
    const mamoudouAdresse = result[2]._id
    
    await studentModel.deleteMany({}).exec();
    await studentModel.create([
      {
        firstName: "John",
        surname: "Doe",
        address: rueDeLaReunionAddress
      },
      {
        firstName: "Jane",
        surname: "Dane",
        address: laBasAddress
      },
      {
        firstName: "Mahmoduou",
        surname: "Goumane",
        address: mamoudouAdresse,
      },
    ]);
}
createAddresses();