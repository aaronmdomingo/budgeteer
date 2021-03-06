import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';

const Register = (props: any) => {
    const { isLoggedIn } = props;
    const [ isDoneLoading, setIsDoneLoading ] = useState(false);
    const [ serverResponse, setServerResponse ] = useState('');
    const [ inHover, setInHover ] = useState(false);
    const [ form, setForm ] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        budget: ''
    });
    const [ userCookie ] = useCookies(['current-user']);
    const { userName, firstName, lastName, password, confirmPassword, budget } = form;
    let status, passwordMatch, passwordValid: any;

    useEffect(() => {
        setIsDoneLoading(true);
    }, [isLoggedIn])

    const createUser = (userObj: any) => {
        fetch(`/api/user/${userObj.userName}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userObj) })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setForm({
                        ...form,
                        userName: ''
                    })
                    setServerResponse(res.error);
                } else {
                    clearInputs();
                    props.history.push('/login', {message: "User successfully created"});
                }
            })
    }

    const hoverHandler = (bool: boolean) => {
        setInHover(bool)
    }


    const formChange = (event: any) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
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
            setForm({
                ...form,
                confirmPassword: ''
            })
        } else {
            createUser(userObj);
        }
    }

    const clearInputs = () => {
        setForm({
            ...form,
            userName: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: ''
        })
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
                            <input value={userName} name="userName"  type="text" className={`value ${userName.length ? 'success' : 'danger' }`} onChange={formChange} autoComplete="off" required/>
                            {
                                serverResponse ? <span> { serverResponse } </span> : ''
                            }
                        </div>
                        <div className="form">
                            <div className="text">
                                First Name
                            </div>
                            <input value={firstName} type="text" name="firstName" className={`value ${firstName.length ? 'success' : 'danger' }`} onChange={formChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                Last Name
                            </div>
                            <input value={lastName} type="text"  name="lastName" className={`value ${lastName.length ? 'success' : 'danger' }`} onChange={formChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                Password
                            </div>
                            <input value={password} type="password" name="password" className={`value ${passwordValid ? 'success' : 'danger' }`} onChange={formChange} autoComplete="off" required/>
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
                            <input value={confirmPassword} type="password" name="confirmPassword" className={`value ${passwordMatch ? 'success' : 'danger' }`} onChange={formChange} autoComplete="off" required/>
                            {
                                confirmPassword.length && password.length
                                ?  !passwordMatch ? <span> Passwords do not match </span> : ''
                                : ''
                            }
                        </div>
                        <div className="form">
                            <div className="text">
                                Budget
                                <i className="fas fa-info-circle" onMouseEnter={() => hoverHandler(true)} onMouseLeave={() => hoverHandler(false)}></i>
                            </div>
                            <input value={budget} type="number" min="0" max="1000000" name="budget" className={`value ${parseInt(budget) > 0 ? 'success' : 'danger' }`} onChange={formChange} autoComplete="off" required/>
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
