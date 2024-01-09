import { useState } from 'react';

export default function InfoForm({ user, setUser }) {

    //    moved to higher level 
    //    const [user, setUser] = useState({
    //         fullName: "",
    //         email: "",
    //         telephone: ""
    //    })

    // using an isSubmitted value in state now - works for this use case - but ususally form submissions would be storing data/redirecting somewhere etc...
    // const [submittedInfo, setSubmittedInfo] = useState([user.fullName, user.email, user.telephone])

    const [editMode, setEditMode] = useState(false)

    function toggleEdit() {
        setEditMode(!editMode)
    }

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        // setSubmittedInfo([user.fullName, user.email, user.telephone])
        // using user useState from top level parent component (App.js)
        // just setting isSubmitted true to render <ul> below and in preview
        setUser({
            ...user,
            isSubmitted: true,
        })
        toggleEdit()
    }

    return (
        <>
            <h1>Personal Info</h1>

            {!editMode &&
                <button onClick={toggleEdit}>Add Info</button>
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
                    <label>
                        Address:
                        <input
                            name="address"
                            type="text"
                            value={user.address}
                            onChange={handleChange}

                        />
                    </label>
                    <button>Submit</button>
                </form>
            }
        </>

    )
}
