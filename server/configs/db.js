import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("✅ Database Connected"))
        mongoose.connection.on('error', (err) => console.log("❌ Database Connection Error:", err.message))

        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`, {
            serverSelectionTimeoutMS: 5000,
        })
    } catch (error) {
        console.log("⚠️ DB Connection Failed:", error.message);
    }
}

export default connectDB;