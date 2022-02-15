const url = process.env.DB as string;
import mongoose from "mongoose";
console.log(url);
console.log("connecting to MongoDB");
mongoose.connect(url)
  .then(_result => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const peopleSchema = new mongoose.Schema({
  people: []
});

peopleSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
const peopleModel = mongoose.model("People", peopleSchema);
export default peopleModel;