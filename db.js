const db="mongodb+srv://russell1997100188:7tPDb0vHGWB3KNAR@cluster0.pejqq7y.mongodb.net/course";
const mongose=require("mongoose");


const connectDB=async()=>{
    try {
        await mongose.connect(db,{useNewUrlParser:true});
        console.log("DB connect successfully");
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports=connectDB;