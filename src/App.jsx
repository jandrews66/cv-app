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
    address: "",
    isSubmitted: false,
    isValid: false
  })

  const [showInfoForm, setShowInfoForm] = useState(false)


  function handleInfoEdit(){
    setShowInfoForm(true)


    } 
  
    function handleInfoRemove(){
      setUser({
        fullName: "",
        email: "",
        telephone: "",
        address: "",
        isSubmitted: false,
      })
    }
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
    setShowEduForm(true)
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
        <InfoForm user={user} setUser={setUser} showInfoForm={showInfoForm} setShowInfoForm={setShowInfoForm} />
        <ExperienceSection experience={experience} setExperience={setExperience} expArray={expArray} setExpArray={setExpArray} showExpForm={showExpForm} setShowExpForm={setShowExpForm}/>
        <EducationSection education={education} setEducation={setEducation} eduArray={eduArray} setEduArray={setEduArray} showEduForm={showEduForm} setShowEduForm={setShowEduForm}/>
      </div>
      <div className="previewSection">
        {!!user.isSubmitted && (
          <div className="header">
            <h1>{user.fullName}</h1>
            <p><span>{user.email}</span><span>{user.telephone}</span><span>{user.address}</span></p>
            <div className="btnContainer">
                  <button type='button' onClick={() => handleInfoEdit()}>Edit</button>
                  <button type='button' onClick={() => handleInfoRemove()}>Remove</button>
                </div>
          </div>
          )}
          {expArray.length > 0 &&
          //show heading if an Experience has been added to the array
            <h2>Professional Experience</h2>
          }
          <ul>
            {expArray
            //sort job experiences from most recent to least recent
              .sort((a, b) => (b.endDate > a.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0)
              //render experiences
              .map((info) => {
                return <li key={info.id}>
                  <div className="content">
                    <div className="topSection">
                      <p><span className="boldText">{info.jobTitle}, </span><span className="italicText">{info.company}</span></p>
                      <p>From {reverseString(`${info.startDate}`)} to {reverseString(`${info.endDate}`)}</p>
                    </div>

                      {/* render line breaks from description text area*/}
                      <p>{info.description.split("\n").map(function(item, index){
                          return (
                              <span key={index}>
                                  {item}
                                  <br/>
                              </span>
                          )
                    })}</p>
                    <div className="btnContainer">
                      <button type='button' onClick={() => handleEdit(info.id)}>Edit</button>
                      <button type='button' onClick={() => handleRemove(info.id)}>Remove</button>
                    </div>

                </div>
              </li>;
            })}
          </ul>
        {eduArray.length > 0 &&
          <h2>Education</h2>
        }
        <ul>
        {eduArray
        //sort education from most recent to least recent
        .sort((a, b) => (b.endDate > a.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0)
        //render education
        .map((info) => {
            return <li key={info.id}>
              <div className="content">
                <div className="topSection">
                  <p><span className="boldText">{info.type}, </span><span className="italicText">{info.institution}</span></p>
                  <p>From {reverseString(`${info.startDate}`)} to {reverseString(`${info.endDate}`)}</p>
                </div>
                <p>{info.grade}</p>
                <div className="btnContainer">
                  <button type='button' onClick={() => handleEduEdit(info.id)}>Edit</button>
                  <button type='button' onClick={() => handleEduRemove(info.id)}>Remove</button>
                </div>
              </div>

            </li>;
        })}
        </ul>
      </div>
    </div>

  )
}

export default App
