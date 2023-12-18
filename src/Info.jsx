import { useState } from 'react';

export default function InfoForm(){
   
   const [user, setUser] = useState({
        fullName: "Joe Bloggs",
        email: "joebloggs@gmail.com",
        telephone: "203030322"
   })

   const [submittedInfo, setSubmittedInfo] = useState([user.fullName, user.email, user.telephone])

   const [editMode, setEditMode] = useState(false)
   
   function toggleEdit(){
        setEditMode(!editMode)
   }

   function handleChange(e){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setSubmittedInfo([user.fullName, user.email, user.telephone])
        toggleEdit()
    }

    return (
        <>
        <ul>
        {submittedInfo.map((info, index) => {
            return <li key={index}>{info}</li>;
        })}
        </ul>
        {!editMode &&
            <button onClick={toggleEdit}>Edit</button>
        }
        {editMode &&
            <form onSubmit={handleSubmit}>        
            <label>
                Full Name:
                <input
                    name="fullName" 
                    type="text"
                    value={user.fullName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input 
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}

                />
            </label>
            <label>
                Telephone:
                <input 
                    name="telephone"
                    type="text"
                    value={user.telephone}
                    onChange={handleChange}

                />
            </label>
            <button>Submit</button>
        </form>     
        }
        </>
   
    )
}