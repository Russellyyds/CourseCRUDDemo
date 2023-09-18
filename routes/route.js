const express = require("express");
const router = express.Router();
const Course = require("../models/Course");


router.post("/courses", async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course)
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {}
            for (const field in error.errors) {
                console.log(error.errors);
                errors[field] = error.errors[field].message
            }
            return res.status(400).json({ errors });
        }
        res.status(500).json({ error: error.message });
    }
})
router.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
});

//update a course by ID
router.put("/courses/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true })
        if(!course){
            return res.status(404).json({error:"Course not found"});
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
})
//delete
router.delete("/courses/:id",async(req,res)=>{
    const id = req.params.id;
    try {
        const result=await Course.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({error:"Course not found"});
        }
        res.json({message:"delete successfully"})
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
})
module.exports = router;