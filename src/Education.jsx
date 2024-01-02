import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function EducationSection(){

    const [education, setEducation] = useState({
        //give each education a unique id
        id: uuidv4(),
        type: "",
        institution: "",
        startDate: "",
        endDate: "",
        grade: ""
   })

   const [submittedInfo, setSubmittedInfo] = useState([])

   const [displayForm, setDisplayForm] = useState(false)

   function toggleForm(){
        setDisplayForm(!displayForm)
   }

   function handleChange(e){
    setEducation({
        ...education,
        [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        // if statemenet to check if the form is Editing an existing education.
        // if education.id matches an element with the same id in the submitted info array,
        if (submittedInfo.find((element) => element.id == education.id)){
            //create a new array without that element
            const newList = submittedInfo.filter((item)=> item.id !== education.id);
            //add the education to the new array and render
            setSubmittedInfo([...newList, education])
        //else add the new education to the exisiting submitted info array
        } else {
            setSubmittedInfo([...submittedInfo, education])
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
        toggleForm();

    }

    function handleEdit(selectedId){
        let obj = submittedInfo.filter(info => info.id == selectedId)
        setEducation(obj[0])
    } 
 
    function handleRemove(selectedId){
        // create a new list which does not contain the Item matching the selected Id 
        const newList = submittedInfo.filter((item)=> item.id !== selectedId);
        //change the state of submitted info to render the new list
        setSubmittedInfo(newList);
    }


    function reverseString(dateString){
        //change from YYYY-MM-DD to DD-MM-YYYY
        return dateString.split("-").reverse().join("-")
    }

    return (
        <>
        <h1>Education</h1>
        {!displayForm &&
            <button onClick={toggleForm}>Add Education</button>
        }
        {displayForm && 
            <form onSubmit={handleSubmit}>
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
            <button>Submit</button>
        </form>
        }

        <ul>
        {submittedInfo
        //sort education from most recent to least recent
        .sort((a, b) => (b.endDate > a.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0)
        //render education
        .map((info) => {
            return <li key={info.id}>
                <p>{info.type} at {info.institution}</p>
                <p>{info.grade}</p>
                <p>From {reverseString(`${info.startDate}`)} to {reverseString(`${info.endDate}`)}</p>
                {/* render line breaks from description text area*/}
                <button type='button' onClick={() => handleEdit(info.id)}>Edit</button>
                <button type='button' onClick={() => handleRemove(info.id)}>Remove</button>
            </li>;
        })}
        </ul>
        </>
        
    )
}