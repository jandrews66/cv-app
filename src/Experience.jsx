import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function ExperienceSection(){

    const [experience, setExperience] = useState({
        id: "",
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: ""
   })

   const [submittedInfo, setSubmittedInfo] = useState([])

   function handleChange(e){
    setExperience({
        ...experience,
        [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        //give each experience a unique key
        setExperience(experience.id = uuidv4())
        setSubmittedInfo([...submittedInfo, experience])
        setExperience({
            id: "",
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            description: ""
        })
    }

    return (
        <>
        <h1>Experience</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Job Title:{""}
                <input 
                    name="jobTitle"
                    type="text"
                    value={experience.jobTitle}
                    onChange={handleChange}
                />
            </label>
            <label>
                Company:{""}
                <input 
                    name="company"
                    type="text"
                    value={experience.company}
                    onChange={handleChange}
                />
            </label>
            <label>
                Start Date:{""}
                <input 
                    name="startDate"
                    type="date"
                    value={experience.startDate}
                    onChange={handleChange}
                />
            </label>
            <label>
                End Date:{""}
                <input 
                    name="endDate"
                    type="date"
                    value={experience.endDate}
                    onChange={handleChange}
                />
            </label>
            <label>
                Description:{""}
                <input 
                    name="description"
                    type="text"
                    value={experience.description}
                    onChange={handleChange}
                />
            </label>
            <button>Submit</button>
        </form>
        <ul>
        {submittedInfo.map((info) => {
            return <li key={info.id}>
                <p>{info.id}</p>
                <p>{info.jobTitle} at {info.company}</p>
                <p>From {info.startDate} to {info.endDate}</p>
                <p>{info.description}</p>
            </li>;
        })}
        </ul>
        </>
        
    )
}