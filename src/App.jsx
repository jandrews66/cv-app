import { useState } from 'react'

import './App.css'
import BasicInfo from './BasicInfo'
import InfoForm from './Info'
import ExperienceSection from './Experience'

function App() {

  return (
    <>
      <h1>CV Generator</h1>
      <InfoForm/>
      <ExperienceSection/>
    </>

  )
}

export default App
