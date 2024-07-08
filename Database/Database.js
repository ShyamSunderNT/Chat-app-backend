import mongoose from "mongoose";

const ConnectDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL),
        console.log("DB connected Succesfully");
    } catch (error) {
        console.log(console.error);
       
    }
}

export default ConnectDB;