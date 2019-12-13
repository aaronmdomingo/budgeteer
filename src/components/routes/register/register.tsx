import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './_register.scss';

const Register = (props: any) => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ userName, setUserName ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    let status, passwordMatch, passwordValid: any;

    useEffect(() => {
        setIsLoading(false);
    })

    const handleChange = (event: any) => {
        switch (event.target.name) {
            case 'userName':
                setUserName(event.target.value);
                break;
            case 'firstName':
                setFirstName(event.target.value);
                break;
            case 'lastName':
                setLastName(event.target.value);
                break;
        }
    }

    const handlePassWordChange = (event: any) => {
        switch (event.target.name) {
            case 'password':
                setPassword(event.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(event.target.value);
                break;
        }
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
    }

    if (password.length < 8) {
        status = 'Password must be atleast 8 characters';
    } else if (password.search(/\d/) === -1) {
        status = 'Password must contain atleast 1 number';
    } else if (password.search(/[A-Z]/) === -1) {
        status = 'Password must contain atleast 1 capital letter';
    } else if (password.search(/[!@#*$%^&]/) === -1) {
        status = 'Password must contain atleast 1 special character';
    } else {
        passwordValid = true;
        status = '';
    }


    if (confirmPassword.length) {
        if (password === confirmPassword) {
            passwordMatch = true;
        }
    }

    return (
        <div className="register">
            <div className="register__logo"></div>
            <CSSTransition
                in={!isLoading}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <form className="register__container" onSubmit={handleSubmit}>
                    <div className="register__container_form">
                        <div className="form">
                            <div className="text">
                                Username
                            </div>
                            <input value={userName} name="userName"  type="text" className={`value ${userName.length ? 'success' : 'danger' }`} onChange={handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                First Name
                            </div>
                            <input value={firstName} type="text" name="firstName" className={`value ${firstName.length ? 'success' : 'danger' }`} onChange={handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                Last Name
                            </div>
                            <input value={lastName} type="text"  name="lastName" className={`value ${lastName.length ? 'success' : 'danger' }`} onChange={handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                Password
                            </div>
                            <input value={password} type="password" name="password" className={`value ${passwordValid ? 'success' : 'danger' }`} onChange={handlePassWordChange} autoComplete="off" required/>
                            {
                                password.length ?  
                                passwordValid ? '' : <span> {status} </span>  
                                : ''
                            }
                        </div>
                        <div className="form">
                            <div className="text">
                                Confirm Password
                            </div>
                            <input value={confirmPassword} type="password" name="confirmPassword" className={`value ${passwordMatch ? 'success' : 'danger' }`} onChange={handlePassWordChange} autoComplete="off" required/>
                            {
                                confirmPassword.length && password.length 
                                ?  !passwordMatch ? <span> Passwords do not match </span> : '' 
                                : ''
                            }
                        </div>
                    </div>
                    <div className="register__container_button">
                        <div className="button-main">
                            <button type="submit">Register</button>
                            <svg>
                                <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </div>
                </form>
            </CSSTransition>
        </div>
    )
}

export default withRouter(Register);