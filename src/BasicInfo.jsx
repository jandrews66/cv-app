import {useState} from 'react';

export default function infoForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");


    function handleNameInput(e){
        setFullName(e.target.value);
    }

    function handleEmailInput(e){
        setEmail(e.target.value);
    }

    function handleTelephoneInput(e){
        setTelephone(e.target.value);
    }

    return (
        <form>
            <h1>Basic Info</h1>
            <h2>{fullName + telephone + email}</h2>
            <label>
                Full Name:{""}
                <input 
                    type="text"
                    //value={fullName}
                    onChange={handleNameInput}
                />
            </label>
            <label>
                Email:{""}
                <input 
                    type="email"
                    value={email}
                    onChange={handleEmailInput}
                />
            </label>
            <label>
                Telephone:{""}
                <input 
                    type="number"
                    value={telephone}
                    onChange={handleTelephoneInput}
                />
            </label>
            <button>Submit</button>
        </form>
    )

}

