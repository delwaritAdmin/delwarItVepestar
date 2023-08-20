// Import the required modules
const mongoose = require("mongoose");

// Define the function to connect to the MongoDB database
const connectDb = async () => {
  try {
    // Define the MongoDB connection URI
    const mongoURI =
      "mongodb+srv://vefixeb522:ZQO60P6s40jbrZDD@cluster0.cs9pz1m.mongodb.net/formmy?retryWrites=true&w=majority";

    // Connect to the MongoDB database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    // Proceed with creating data or other operations
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Call the connectDb function wherever it's needed
export default connectDb;
