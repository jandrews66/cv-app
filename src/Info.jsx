import { useState } from 'react';

export default function InfoForm({ user, setUser, isActive, setIsActive }) {

    //    moved to higher level 
    //    const [user, setUser] = useState({
    //         fullName: "",
    //         email: "",
    //         telephone: ""
    //    })

    // using an isSubmitted value in state now - works for this use case - but ususally form submissions would be storing data/redirecting somewhere etc...
    // const [submittedInfo, setSubmittedInfo] = useState([user.fullName, user.email, user.telephone])

    const [errorMsg, setErrorMsg] = useState("")


    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if ((user.fullName.length === 0) || (user.email.length === 0) || (user.telephone.length === 0) || (user.address.length === 0)) {
            setErrorMsg("Please complete all form fields")
        } else {
            setUser({
                ...user,
                isSubmitted: true,
            })
            setIsActive("")
            setErrorMsg("")

        }

    }

    return (
        <>
            <h3>Personal Info</h3>
            {/* pass onclick function through as a prop otherwise it will be called in render */}
            <Form
                isActive={isActive}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                onShow={() => setIsActive(1)}
                user={user}
                errorMsg={errorMsg}
            />
        </>

    )
}

function Form({ isActive, handleSubmit, handleChange, onShow, user, errorMsg }) {
    if (isActive === 1) {
        return (
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
        )
    } else {
        return <button onClick={onShow}>Add</button>

    }
}
