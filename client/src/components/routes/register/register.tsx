import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';

const Register = (props: any) => {
    const { isLoggedIn } = props;
    const [ isDoneLoading, setIsDoneLoading ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ serverResponse, setServerResponse ] = useState('');
    const [ budget, setBudget ] = useState('');
    const [ inHover, setInHover ] = useState(false);
    const [userCookie] = useCookies(['current-user']);
    let status, passwordMatch, passwordValid: any;

    useEffect(() => {
        setIsDoneLoading(true);
    }, [isLoggedIn])

    const createUser = (userObj: any) => {
        fetch(`/api/user/${userObj.userName}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userObj) })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setUserName('');
                    setServerResponse(res.error);
                } else {
                    clearInputs();
                    props.history.push('/login', {message: "User successfully created"});
                }
            })
    }

    const hoverHandler = () => {
        setInHover(!inHover)
    }

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
            case 'budget':
                setBudget(event.target.value);
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
        const userObj = {
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            budget: budget
        }
        if (!passwordValid) {
            setConfirmPassword('');
        } else {
            createUser(userObj);
        }
    }

    const clearInputs = () => {
        setUserName('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
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

    if (userCookie['current-user'] || isLoggedIn) {
        return <Redirect to='/' />
    }

    return (
        <div className="register">
            <div className="register__logo"></div>
            <CSSTransition
                in={isDoneLoading}
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
                            {
                                serverResponse ? <span> { serverResponse } </span> : ''
                            }
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
                        <div className="form">
                            <div className="text">
                                Budget 
                                <i className="fas fa-info-circle" onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}></i>
                            </div>
                            <input value={budget} type="number" min="0" name="budget" className={`value ${parseInt(budget) > 0 ? 'success' : 'danger' }`} onChange={handleChange} autoComplete="off" required/>
                            {
                                inHover ? <span className="info"> Your initial monthly budget, it can be changed at any time </span> : '' 
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