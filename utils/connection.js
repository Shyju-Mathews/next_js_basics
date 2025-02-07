import mongoose from "mongoose";

// const connectMongo = async () => mongoose.connect("mongodb://localhost:27017/nextjs_db");

const connectionToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nextjs_db");
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}

export default connectionToDatabase;