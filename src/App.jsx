import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './App.css'
import InfoForm from './Info'
import ExperienceSection from './Experience'
import EducationSection from './Education'

function App() {

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    telephone: "",
    isSubmitted: false,
  })


  const [experience, setExperience] = useState({
    //give each experience a unique id
    id: uuidv4(),
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: ""
  })

  const [expArray, setExpArray] = useState([])

  const [showExpForm, setShowExpForm] = useState(false)


  function reverseString(dateString){
    //change from YYYY-MM-DD to DD-MM-YYYY
    return dateString.split("-").reverse().join("-")
  }

  function handleEdit(selectedId){
  setShowExpForm(true)
  let obj = expArray.filter(info => info.id == selectedId)
  setExperience(obj[0])
  } 

  function handleRemove(selectedId){
  // create a new list which does not contain the Item matching the selected Id 
  const newList = expArray.filter((item)=> item.id !== selectedId);
  //change the state of submitted info to render the new list
  setExpArray(newList);
  }


  const [education, setEducation] = useState({
    //give each education a unique id
    id: uuidv4(),
    type: "",
    institution: "",
    startDate: "",
    endDate: "",
    grade: ""
  })

  const [eduArray, setEduArray] = useState([])
  const [showEduForm, setShowEduForm] = useState(false)


  function handleEduEdit(selectedId){
    let obj = eduArray.filter(info => info.id == selectedId)
    setEducation(obj[0])
} 

  function handleEduRemove(selectedId){
    // create a new list which does not contain the Item matching the selected Id 
    const newList = eduArray.filter((item)=> item.id !== selectedId);
    //change the state of submitted info to render the new list
    setEduArray(newList);
  }
  return (
    <div className="container">
      <div className="inputSection">
        <h1>CV Generator</h1>
        <InfoForm user={user} setUser={setUser} />
        <ExperienceSection experience={experience} setExperience={setExperience} expArray={expArray} setExpArray={setExpArray} showExpForm={showExpForm} setShowExpForm={setShowExpForm}/>
        <EducationSection education={education} setEducation={setEducation} eduArray={eduArray} setEduArray={setEduArray} showEduForm={showEduForm} setShowEduForm={setShowEduForm}/>
      </div>
      <div className="previewSection">
        {!!user.isSubmitted && (
          <ul>
            {Object.values(user).map((info, index) => {
              return <li key={index}>{info}</li>;
            })}
          </ul>)}
          {expArray
          //sort job experiences from most recent to least recent
            .sort((a, b) => (b.endDate > a.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0)
            //render experiences
            .map((info) => {
              return <li key={info.id}>
                <p>{info.jobTitle} at {info.company}</p>
                <p>From {reverseString(`${info.startDate}`)} to {reverseString(`${info.endDate}`)}</p>
                {/* render line breaks from description text area*/}
                <p>{info.description.split("\n").map(function(item, index){
                    return (
                        <span key={index}>
                            {item}
                            <br/>
                        </span>
                    )
              })}</p>
              <button type='button' onClick={() => handleEdit(info.id)}>Edit</button>
              <button type='button' onClick={() => handleRemove(info.id)}>Remove</button>
            </li>;
        })}
        <ul>
        {eduArray
        //sort education from most recent to least recent
        .sort((a, b) => (b.endDate > a.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0)
        //render education
        .map((info) => {
            return <li key={info.id}>
                <p>{info.type} at {info.institution}</p>
                <p>{info.grade}</p>
                <p>From {reverseString(`${info.startDate}`)} to {reverseString(`${info.endDate}`)}</p>
                {/* render line breaks from description text area*/}
                <button type='button' onClick={() => handleEduEdit(info.id)}>Edit</button>
                <button type='button' onClick={() => handleEduRemove(info.id)}>Remove</button>
            </li>;
        })}
        </ul>
      </div>
    </div>

  )
}

export default App
