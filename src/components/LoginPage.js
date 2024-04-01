import React, {useState} from 'react';
import Header from './Header';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Footer from './Footer';
import { useActionData } from 'react-router-dom';

const Loginpage = () => {
    const [form, setForm] = useState("login");

    function handleButtonClick(event){
        setForm(form === "login"? "signup" : "login");
        var lsbutton = document.getElementById("lsbutton");
        if (lsbutton.innerHTML === "Switch to Signup") {
            lsbutton.innerHTML = "Switch to Login";
          } else {
            lsbutton.innerHTML = "Switch to Signup";
          }
    }

    return(
        <div>
            <Header />
            {form === "login" ? <LoginForm /> : <SignupForm />}
            <button id = "lsbutton" onClick={handleButtonClick}>Switch to Signup</button>
            <Footer />
        </div>
    );
};

export default Loginpage;