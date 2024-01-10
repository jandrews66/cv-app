import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, parse } from 'date-fns';


export default function ExperienceSection({experience, setExperience, expArray, setExpArray, isActive, setIsActive}){

   function handleChange(e){
    setExperience({
        ...experience,
        [e.target.name]: e.target.value
        })
    }

    const [errorMsg, setErrorMsg] = useState("")

    function validate(e){
        e.preventDefault();

        if((experience.jobTitle === "") || (experience.company === "") || (experience.description === "")){
            setErrorMsg("Please complete all form fields")
        } else if (experience.startDate >= experience.endDate){
            setErrorMsg("End date must be later than start date")
        } else {
            setErrorMsg("")
            handleSubmit()
        }
    }
    function handleSubmit(){
        // if statemenet to check if the form is Editing an existing experience.
        // if experience.id matches an element with the same id in the submitted info array,
        if (expArray.find((element) => element.id == experience.id)){
            //create a new array without that element
            const newList = expArray.filter((item)=> item.id !== experience.id);
            //add the experience to the new array and render
            setExpArray([...newList, experience])
        //else add the new experience to the exisiting submitted info array
        } else {
            setExpArray([...expArray, experience])
        }
        //clear form 
        setExperience({
            id: uuidv4(),
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            description: ""
        })
        setIsActive("")
    }

    function Form({onShow}){
        if(isActive === 2){
            return (
                <form onSubmit={validate}>
                <label>
                    Job Title:
                    <input 
                        name="jobTitle"
                        type="text"
                        value={experience.jobTitle}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Company:
                    <input 
                        name="company"
                        type="text"
                        value={experience.company}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Start Date:
                    <input 
                        name="startDate"
                        type="date"
                        value={experience.startDate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    End Date:
                    <input 
                        name="endDate"
                        type="date"
                        value={experience.endDate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Description:
                    <textarea 
                        name="description"
                        type="text"
                        value={experience.description}
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
        <h3>Experience</h3>
        <Form onShow={() => setIsActive(2)}/>
        </>
        
    )
}