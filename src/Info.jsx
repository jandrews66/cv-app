import { useState } from 'react';

export default function InfoForm({ user, setUser, showInfoForm, setShowInfoForm }) {

    //    moved to higher level 
    //    const [user, setUser] = useState({
    //         fullName: "",
    //         email: "",
    //         telephone: ""
    //    })

    // using an isSubmitted value in state now - works for this use case - but ususally form submissions would be storing data/redirecting somewhere etc...
    // const [submittedInfo, setSubmittedInfo] = useState([user.fullName, user.email, user.telephone])

    const [errorMsg, setErrorMsg] = useState("")

    function toggleEdit() {
        setShowInfoForm(!showInfoForm)
    }

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if ((user.fullName.length === 0) || (user.email.length === 0) || (user.telephone.length === 0) || (user.address.length === 0)){
            setErrorMsg("Please complete all form fields")
        } else {
            setUser({
                ...user,
                isSubmitted: true,
            })
            toggleEdit()
            setErrorMsg("")

        }

    }

    return (
        <>
            <h1>Personal Info</h1>

            {!showInfoForm &&
                <button onClick={toggleEdit}>Add Info</button>
            }
            {showInfoForm &&
            
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
                    <label>
                        Address:
                        <input
                            name="address"
                            type="text"
                            value={user.address}
                            onChange={handleChange}

                        />
                    </label>
                    <div className="error">{errorMsg}</div>

                    <button>Submit</button>
                </form>
            }
        </>

    )
}
