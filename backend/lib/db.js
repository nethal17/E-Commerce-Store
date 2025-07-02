import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Keep this reasonable
            socketTimeoutMS: 45000
          });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error){
        console.log("Error connecting MongoDB", error.message);
        process.exit(1);
    }
}