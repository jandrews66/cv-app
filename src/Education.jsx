import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function EducationSection({education, setEducation, eduArray, setEduArray, isActive, setIsActive}){

   function handleChange(e){
    setEducation({
        ...education,
        [e.target.name]: e.target.value
        })
    }
    const [errorMsg, setErrorMsg] = useState("")

    function validate(e){
        e.preventDefault();

        if((education.type === "") || (education.institution === "") || (education.grade === "")){
            setErrorMsg("Please complete all form fields")
        } else if (education.startDate >= education.endDate){
            setErrorMsg("End date must be later than start date")
        } else {
            setErrorMsg("")
            handleSubmit()
        }
    }
    function handleSubmit(){
        // if statemenet to check if the form is Editing an existing education.
        // if education.id matches an element with the same id in the submitted info array,
        if (eduArray.find((element) => element.id == education.id)){
            //create a new array without that element
            const newList = eduArray.filter((item)=> item.id !== education.id);
            //add the education to the new array and render
            setEduArray([...newList, education])
        //else add the new education to the exisiting submitted info array
        } else {
            setEduArray([...eduArray, education])
        }
        //clear form 
        setEducation({
            id: uuidv4(),
            type: "",
            institution: "",
            startDate: "",
            endDate: "",
            grade: ""
        })
        setIsActive("")

    }

    function Form({onShow}){
        if(isActive === 3){
            return (
                <form onSubmit={validate}>
                <label>
                    Type of Education:
                    <input 
                        name="type"
                        type="text"
                        value={education.type}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Insitution:
                    <input 
                        name="institution"
                        type="text"
                        value={education.institution}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Start Date:
                    <input 
                        name="startDate"
                        type="date"
                        value={education.startDate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    End Date:
                    <input 
                        name="endDate"
                        type="date"
                        value={education.endDate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Grade / Level:
                    <input 
                        name="grade"
                        type="text"
                        value={education.grade}
                        onChange={handleChange}
                    />
                </label>
                <div className="error">{errorMsg}</div>
                <button>Submit</button>
            </form>
            )
        } else {
            return <button onClick={onShow}>Add</button>
        }
    }
    return (
        <>
        <h3>Education</h3>
        <Form onShow={() => setIsActive(3)}/>
        </>  
    )
}