import { useState } from 'react';

export default function InfoForm(){
   
   const [user, setUser] = useState({
        fullName: "Joe Bloggs",
        email: "joebloggs@gmail.com",
        telephone: "203030322"
   })

   const [submittedInfo, setSubmittedInfo] = useState([user.fullName, user.email, user.telephone])

   
   function handleChange(e){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setSubmittedInfo([user.fullName, user.email, user.telephone])

    }


    return (
        <>
        <ul>
        {submittedInfo.map((info) => {
            return <li key={info}>{info}</li>;
        })}
        </ul>
        <form onSubmit={handleSubmit}>
            <h1>Basic Info</h1>
        
            <label>
                Full Name:{""}
                <input
                    name="fullName" 
                    type="text"
                    value={"user.fullName"}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:{""}
                <input 
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}

                />
            </label>
            <label>
                Telephone:{""}
                <input 
                    name="telephone"
                    type="text"
                    value={user.telephone}
                    onChange={handleChange}

                />
            </label>
            <button>Submit</button>
        </form> 
        </>
   
    )
}