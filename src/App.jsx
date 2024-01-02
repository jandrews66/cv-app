import { useState } from 'react'

import './App.css'
import InfoForm from './Info'
import ExperienceSection from './Experience'
import EducationSection from './Education'

function App() {

  return (
  <div className="container">
      <div className="inputSection">
      <h1>CV Generator</h1>
      <InfoForm/>
      <ExperienceSection/>
      <EducationSection/>
    </div>
    <div className="previewSection">
    </div>
  </div>

  )
}

export default App
