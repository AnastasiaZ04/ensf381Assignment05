import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({login}) => {
    const [emptyError, setEmptyError] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [message, setMessage] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    function handleUsernameChange(event){
        setInputName(event.target.value);
    }

    function handlePasswordChange(event){
        setInputPassword(event.target.value);
    }

    async function handleSubmit(event){
        event.preventDefault(); //prevents button from submitting form 

        if( (inputName.trim() === '') || (inputPassword === '')){
            setEmptyError(true);
        }
        else{
            setEmptyError(false);
            try{
                const response = await fetch('http://127.0.0.1:5000/authenticate', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'username': inputName, 
                        'password': inputPassword
                    }),
                }); 
                const data = await response.json();
                if (response.ok){
                    setAuthenticated(true);
                    localStorage.setItem('loginSuccess', true);
                    window.location.href = '/products';
                }
                else{
                    setAuthenticated(false);
                    localStorage.setItem('loginSuccess', false);

                }
                setMessage(data.message);
            }
            catch(error){
                console.log(error);
                setMessage('Authentication failed. Incorrect username or password.');
                setAuthenticated(false);
            }
        }
    }

    if (authenticated){
        navigate("/products");
    }

    return(
        <div>
        <h2>Login</h2>
        { emptyError && (
          <div>
            <p style={{color:'red'}}>All fields are required!</p>
          </div>
        )}

        { !authenticated && (
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
            <button type = "submit">Login</button>
            <br/>
        </form>
        </div>
    );
};

export default LoginForm;