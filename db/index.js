import mongoose from "mongoose";

const connectDB = async () => {
    try{
        // console.log(`${process.env.MONGODB_URI}`);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
        console.log(`Database connected successfully !! On Host: ${connectionInstance.connection.host}`);
    }catch (e){
        console.error("MongoDB connection error: ", e);
        process.exit(1);
    }
}

export default connectDB;