const express=require("express")
const cors=require("cors");
const connectDB=require("./db");
// const connectDB=require("")
// to do database connection
const routes=require("./routes/route")
const app=express()
const PORT=process.env.PORT || 8000;

connectDB();


app.use(cors(
    {
        origin:"http://127.0.0.1:5501",
        methods:"GET,POST,PUT,PATCH,DELETE"
    }
))

app.use(express.json())
app.use("/api",routes);
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})