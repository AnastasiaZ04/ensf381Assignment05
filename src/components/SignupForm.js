import React, { useState } from 'react';

const SignupForm = () => {
    const [emptyError, setEmptyError] = useState(false); // used to prevent empty field submission
    const [matchingError, setMatchingError] = useState(false); // used to prevent submitting password that doesn't match confirm password field
    const [signupSuccess, setSignupSuccess] = useState(false); 
    const [inputName, setInputName] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputConfirmPassword, setInputConfirmPassword] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [message, setMessage] = useState("");

    function handleUsernameChange(event){
        setInputName(event.target.value);
    }

    function handlePasswordChange(event){
        setInputPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event){
        setInputConfirmPassword(event.target.value);
    }

    function handleEmailChange(event){
        setInputEmail(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault(); //prevents button from submitting form 

        if( (inputName.trim() === '') || (inputPassword === '') || (inputConfirmPassword === '') || (inputEmail === '')){
            setEmptyError(true);
        }
        else{
            setEmptyError(false);
        }

        if(inputPassword !== inputConfirmPassword){
            setMatchingError(true);
        }
        else{
            setMatchingError(false);
        }

        if (!((inputName.trim() === '') || (inputPassword === '') || (inputConfirmPassword === '') || (inputEmail === '')) && (inputPassword === inputConfirmPassword)){
            try{
                 const response = await fetch('http://127.0.0.1:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'username': inputName, 
                        'password': inputPassword, 
                        'email': inputEmail
                    }),
                });
                const data = await response.json();
                if (response.ok){
                    setSignupSuccess(true);
                }
                else{
                    setSignupSuccess(false);
                }
                setMessage(data.message);
            }
            catch(error){
                console.error("Error:", error);
            }



                //.then(response => {
                    //if (response.ok){
                        //setSignupSuccess(true);  
                    //}
                    //else{
                        //setSignupSuccess(false);
                        //throw new Error('Registration failed.');
                    //}

                //})
            //.then(data => setMessage(data.message))
            //.catch(error => {
                //setMessage('Registration failed.');
                //setSignupSuccess(false);
            //});

        }
        }

    return(
        <div>
        <h2>Signup</h2>
        { emptyError && (
          <div>
            <p style={{color:'red'}}>All fields are required!</p>
          </div>
        )}

        { matchingError && (
          <div>
            <p style={{color:'red'}}>Passwords do not match!</p>
          </div>
        )}

        { signupSuccess && (
          <div>
            <p style={{color:'green'}}>{message}</p>
          </div>
        )}

        { !signupSuccess && (
          <div>
            <p style={{color:'red'}}>{message}</p>
          </div>
        )}


        <form name = "login" onSubmit={handleSubmit}>
        <label for = "username">Username:</label>
            <input type = "text" id = "username" name = "username" value = {inputName} placeholder='Enter your username' onChange={handleUsernameChange} />
            <br/>
            <label for = "password">Password:</label>
            <input type = "password" id = "password" name = "password" value = {inputPassword} placeholder='Enter your password' onChange={handlePasswordChange} />
            <br/>
            <label for = "password">Confirm Password:</label>
            <input type = "password" id = "confirm-password" name = "confirm-password" value = {inputConfirmPassword} placeholder='Confirm your password' onChange={handleConfirmPasswordChange} />
            <br/>
            <label for = "email">Email:</label>
            <input type = "text" id = "email" name = "email" value = {inputEmail} placeholder='Enter your email' onChange={handleEmailChange} />
            <br/>
            <button type = "submit">Signup</button>
            <br/>
        </form>
        </div>
    );
};

export default SignupForm;