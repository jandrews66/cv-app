import { useState } from 'react'

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

  return (
    <div className="container">
      <div className="inputSection">
        <h1>CV Generator</h1>
        <InfoForm user={user} setUser={setUser} />
        <ExperienceSection />
        <EducationSection />
      </div>
      <div className="previewSection">
        {!!user.isSubmitted && (
          <ul>
            {Object.values(user).map((info, index) => {
              return <li key={index}>{info}</li>;
            })}
          </ul>)}
      </div>
    </div>

  )
}

export default App
