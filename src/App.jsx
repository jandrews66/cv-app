import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './App.css'
import InfoForm from './Info'
import ExperienceSection from './Experience'
import EducationSection from './Education'
import GenericPdfDownloader from './PdfDownloader';

import { FiDelete } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";


function App() {

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    telephone: "",
    address: "",
    isSubmitted: false,
    isValid: false
  })

  //use isActive to create an accordion for input forms. Info Form = 1, Exp Form = 2, Edu Form = 3
  const [isActive, setIsActive] = useState("")

  function handleInfoEdit(){
    setIsActive(1)

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

  function reverseString(dateString){
    //change from YYYY-MM-DD to DD-MM-YYYY
    return dateString.split("-").reverse().join("-")
  }

  function handleEdit(selectedId){
    setIsActive(2)
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

  function handleEduEdit(selectedId){
    setIsActive(3)
    let obj = eduArray.filter(info => info.id == selectedId)
    setEducation(obj[0])
  } 

  function handleEduRemove(selectedId){
    // create a new list which does not contain the Item matching the selected Id 
    const newList = eduArray.filter((item)=> item.id !== selectedId);
    //change the state of submitted info to render the new list
    setEduArray(newList);
  }

  const [showBtns, setShowBtns] = useState(true)


  return (
    <div className="container">
      <div className="inputSection">
        <h1>CV Generator</h1>
        <InfoForm user={user} setUser={setUser} isActive={isActive} setIsActive={setIsActive} />
        <ExperienceSection experience={experience} setExperience={setExperience} expArray={expArray} setExpArray={setExpArray} isActive={isActive} setIsActive={setIsActive}/>
        <EducationSection education={education} setEducation={setEducation} eduArray={eduArray} setEduArray={setEduArray} isActive={isActive} setIsActive={setIsActive}/>
        <GenericPdfDownloader 
          downloadFileName="myCV"
          rootElementId="preview" 
          showBtns={showBtns}
          setShowBtns={setShowBtns}
        />
      </div>
      <div id="preview" className="previewSection">
      <ul>
        {!!user.isSubmitted && (
          <div className="header">
            <div className="personalInfo">
              <h1>{user.fullName}</h1>
              <p><span>{user.email}</span><span>{user.telephone}</span><span>{user.address}</span></p>
            </div>
            {showBtns &&
                <div className="btnContainer">
                  <button type='button' onClick={() => handleInfoEdit()}><FiEdit /></button>
                   <button type='button' onClick={() => handleInfoRemove()}><FiDelete /></button>
                </div>
            }
          </div>
          )}
        </ul>
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
                    </div>

                    {showBtns &&
                      <div className="btnContainer">
                        <button type='button' onClick={() => handleEdit(info.id)}><FiEdit /></button>
                        <button type='button' onClick={() => handleRemove(info.id)}><FiDelete /></button>
                      </div>
                    }
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
                </div>

                {showBtns &&
                <div className="btnContainer">
                  <button type='button' onClick={() => handleEduEdit(info.id)}><FiEdit /></button>
                  <button type='button' onClick={() => handleEduRemove(info.id)}><FiDelete /></button>
                </div>
            }

            </li>;
        })}
        </ul>
      </div>
    </div>
  )
}

export default App
