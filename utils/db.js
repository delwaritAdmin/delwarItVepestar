// Import the required modules
const mongoose = require("mongoose");

// Define the function to connect to the MongoDB database
const connectDb = async () => {
  try {
    // Define the MongoDB connection URI
    const mongoURI =
      "mongodb+srv://acorsult:NrUdKO1n3QilLa15@cluster0.0oq6x1z.mongodb.net/vepestar?retryWrites=true&w=majority";

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
