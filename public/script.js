document.addEventListener("DOMContentLoaded", () => {
    const addCourseForm = document.getElementById("add-course-form");
    const courseList = document.getElementById("course-list");
    const errorContainer = document.getElementById("error-container");

    const fetchCourses = async() => {
        try {
           const response= await fetch("http://localhost:8000/api/courses")
           const courses=await response.json()
           console.log("courses",courses)
           courseList.innerHTML="";
           courses.forEach((course)=>{
            const li=document.createElement("li");
            li.textContent=`Title${course.title},Instructor:${course.instructor},duration:${course.duration}`
            const deleteBtn=document.createElement("button");
            deleteBtn.textContent="Delete";
            deleteBtn.classList.add("delete-button");
            deleteBtn.dataset.courseId=course._id;
            li.appendChild(deleteBtn);
            courseList.appendChild(li);
           })
           
        } catch (error) {
            console.error(error)
        }
            
    }
    addCourseForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        const formData=new FormData(addCourseForm);
        const courseData=Object.fromEntries(formData)
        console.log(courseData)

        try {
            const url="http://localhost:8000/api/courses"
            const response=await fetch(url,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(courseData)
            })

            if(response.ok){
                addCourseForm.reset();
                fetchCourses();
            }
            const responseData=await response.json();
            if(responseData.errors){
                errorContainer.innerHTML="";
                for(const field in responseData.errors){
                    const errorText=responseData.errors[field];
                    const errorElement=document.createElement('p');
                    errorElement.textContent=errorText;
                    errorContainer.append(errorElement)
                }
            }
        } catch (error) {
            console.error("Error adding course",response);
        }

    });
    courseList.addEventListener("click",async(event)=>{
        if(event.target.classList.contains("delete-button")){
            const courseId=event.target.dataset.courseId;
            if(window.confirm("Are you sure?")){
                try {
                    const response =await fetch(
                        `http://localhost:8000/api/courses/${courseId}`,
                        {
                            method:"DELETE",
                        });
                    if(response.ok){
                        fetchCourses();
                    }else{
                        console.error("error deleting courses:",response.statusText);
                    }
                } catch (error) {
                    console.error("error deleting courses")
                }
            }
        }
    })
    fetchCourses();
})