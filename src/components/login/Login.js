import React, { useState } from 'react'
import "./Login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

function Login() {
    let [email, setEmail] = useState("")
    let [check, setCheck] = useState(false)
    let [password, setPassword] = useState("")

    const onLogin = (e) => {
        e.preventDefault();
       
        const Endpoint="http://restapi.adequateshop.com/api/authaccount/login"
        fetch(Endpoint, {
            method: "POST",
            headers: {
                "Accept": "application/json",

                "Content-Type": "application/json; charset=UTF-8"
            },

            body:JSON.stringify({
                email,password
            })

          
        }).then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

        


    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
        if (re.test(email)) {
            return true
        } else {
            return false
        }
    }

    const validatePassword = (password) => {
        // console.log(password)
        let ul = document.querySelectorAll(".checks");
        let upper = document.getElementById('upper');
        let lower = document.getElementById('lower');
        let number = document.getElementById('number');
        let special = document.getElementById('special');
        let max10 = document.getElementById("max10");

        (password.match(/^(?=.*[A-Z]).*$/) ? upper.style.color = "#006400" : upper.style.color = "red");
        (password.match(/^(?=.*[a-z]).*$/) ? lower.style.color = "#006400" : lower.style.color = "red");
        (password.match(/^(?=.*[0-9])/) ? number.style.color = "#006400" : number.style.color = "red");
        (password.match(/[!\@\#\$\%\^\&\*\(\)\_\-\+\=\?\>\<\.]/) ? special.style.color = "#006400" : special.style.color = "red");
        (password.match(/^.{9}$/) ? max10.style.color = "#006400" : max10.style.color = "red");

        ul.forEach((item) => {
            if (item.style.color == "red") {
                setCheck(false)
            } else {
                setCheck(true)
            }
        })

    }

    let checkPassword = (e) => {
        setPassword(e.target.value)
        validatePassword(password)

    }

    let checkEmail = (e) => {
        setEmail(e.target.value);
        if (parseInt(email)) {

            phonenumber(email) ? document.getElementById("errorEmail").innerHTML = "" : document.getElementById("errorEmail").innerHTML = "**Invalid phone number!"

        } else {


            validateEmail(email) ? document.getElementById("errorEmail").innerHTML = "" : document.getElementById("errorEmail").innerHTML = "**Email not valid!"

        }


    }

    let phonenumber=(email)=>{
        var phoneno = /^\d{10}$/;
        if (email.match(phoneno)) {
            return true;
        }
        else {

            return false;
        }
    }



    return (
        <div className='loginPage'>

            <div className='container'>

                <div className='wrapper'>
                    <div className='title'><span>Login Form</span></div>
                    <form onSubmit={(e) => onLogin(e)}>
                        <div className='row'>
                            <i><FontAwesomeIcon icon={faUser} /></i>
                            <input type="text"  placeholder='Email or Phone' onChange={(e) => checkEmail(e)} />
                            <span id="errorEmail" style={{ color: "red", padding: "5px" }}></span>
                        </div>
                        <div className='row'>
                            <i><FontAwesomeIcon icon={faLock} /></i>
                            <input type="password" placeholder='Password' onChange={(e) => checkPassword(e)} />
                        </div>
                        <div className='pass'><a href='#'>Forgot Password</a></div>
                        <div className='row button'>
                            <button className='btn' type='submit' disabled={!(check && validateEmail(email))}  >Login</button>
                        </div>
                        <div className='signup-link'>
                            Not a member?<a href='#'>Signup now</a>
                        </div>


                        <ul>
                            <li className='checks' id='upper'>AtLeast one uppercase</li>
                            <li className='checks' id="lower">AtLeast one lowercase</li>
                            <li className='checks' id='special'>AtLeast one special symbol</li>
                            <li className='checks' id='number'>AtLeast one number</li>
                            <li className='checks' id='max10'>Maximum 10 characters</li>


                        </ul>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default Login 