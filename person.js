const mongoose = require("mongoose");
require("dotenv").config(); //import detenv

//1- connection to monodb atlas
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"));

//2- // Define the schema of a person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
  isActive: {
    type: Boolean,
    default: false,
  },
});

// Create the model
const Person = mongoose.model("Person", personSchema);

//3- Create and Save a Record of a Model:

function createOnePerson() {
  const person = new Person({
    name: "Nizar",
    age: 28,
    favoriteFoods: ["Spaghetti", "Kamouniya"],
  });
  // save the new person
  person
    .save()
    .then((res) => console.log("person saved", res))
    .catch((err) => console.log(err));
}

//4- Create Many Records with model.create()

function createManyPeople() {
  const arrayOfPeople = [
    { name: "Mohamed", age: 24, favoriteFoods: ["Sushi", "burritos"] },
    { name: "mariem", age: 37, favoriteFoods: ["burritos", "Ice Cream"] },
    { name: "Mary", age: 41, favoriteFoods: ["burritos", "Pizza"] },
    { name: "Thamer", age: 28, favoriteFoods: ["Tacos", "Pizza"] },
    { name: "abir", age: 21, favoriteFoods: ["burritos", "Pasta"] },
  ];
  // Model.prototype.create() also no longer accepts a callback
  Person.create(arrayOfPeople)
    .then((res) => console.log("people saved", res))
    .catch((err) => console.log(err));
}

//5- Use model.find() to Search Your Database
function findMany() {
  Person.find({ name: "Nizar" })
    .then((res) => console.log("People found:", res))
    .catch((er) => console.error(er));
}

//6- Use model.findOne() to Return a Single Matching Document from Your Database
function findOneByFood() {
  const food = "Spaghetti";

  Person.findOne({ favoriteFoods: food })
    .then((res) => console.log("person found", res))
    .catch((err) => console.log(err));
}

//7- Use model.findById() to Search Your Database By _id
function findOneById() {
  const personId = "64681d6fe560981257efaff1"; // change this id with an existing _id from your db

  Person.findById(personId)
    .then((res) => console.log("person found", res))
    .catch((err) => console.log(err));
}

//8- Perform Classic Updates by Running Find, Edit, then Save
function findByIdEditSave() {
  const personId = "64682189667beb8649479cfe"; // change this id with an existing _id from your db
  Person.findById(personId)
    .then(async (person) => {
      try {
        person.favoriteFoods.push("Hamburger");
        const savedPerson = await person.save();
        console.log("person updated", savedPerson);
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => console.log(err));
}

//9- Perform New Updates on a Document Using model.findOneAndUpdate()
function findByNameAndUpdateAge() {
  const personName = "mariem";
  Person.findOneAndUpdate({ name: personName }, { age: 42 }, { new: true })
    .then((updatedPerson) => console.log("person updated", updatedPerson))
    .catch((err) => console.log(err));
}

//10- Delete One Document Using model.findByIdAndRemove
function findByIdAndRemove() {
  const personId = "64681d6fe560981257efaff1"; // change this id with an existing _id from your db
  Person.findByIdAndRemove(personId)
    .then((removedPerson) => console.log("person removed", removedPerson))
    .catch((err) => console.log(err));
}

//11- MongoDB and Mongoose - Delete Many Documents with model.remove()
// Person.remove() is not a function :'(
function deleteManyByName() {
  const name = "Mary";
  Person.deleteMany({ name: name })
    .then((result) => {
      console.log("Number of people deleted:", result.deletedCount);
    })
    .catch((error) => console.log(error));
}

//12- Chain Search Query Helpers to Narrow Search Results
function searchQueryHelpers() {
  Person.find({ favoriteFoods: "burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec()
    .then((data) => {
      console.log("People found:", data);
    })
    .catch((error) => {
      console.error(error);
    });
}


