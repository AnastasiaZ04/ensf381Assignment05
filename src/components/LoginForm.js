import React, { useState } from 'react';

const LoginForm = () => {
    const [emptyError, setEmptyError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    function handleUsernameChange(event){
        setInputName(event.target.value);
    }

    function handlePasswordChange(event){
        setInputPassword(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault(); //prevents button from submitting form 

        if( (inputName.trim() === '') || (inputPassword === '')){
            setEmptyError(true);
        }
        else{
            setEmptyError(false);
        }

        if ( !((inputName.trim() === '') || (inputPassword === '')) ){
            setLoginSuccess(true);
        }
        else{
            setLoginSuccess(false);
        }

    }

    return(
        <div>

        { emptyError && (
          <div>
            <p style={{color:'red'}}>All fields are required!</p>
          </div>
        )}

        { loginSuccess && (
          <div>
            <p style={{color:'green'}}>User signed up successfully!</p>
          </div>
        )}

        <form name = "login" onSubmit={handleSubmit}>
        <label for = "username">Username:</label>
            <input type = "text" id = "username" name = "username" value = {inputName} placeholder='Enter your username' onChange={handleUsernameChange} />
            <br/>
            <label for = "password">Password:</label>
            <input type = "password" id = "password" name = "password" value = {inputPassword} placeholder='Enter your password' onChange={handlePasswordChange} />
            <br/>
            <button type = "submit">Login</button>
            <br/>
        </form>
        </div>
    );
};

export default LoginForm;