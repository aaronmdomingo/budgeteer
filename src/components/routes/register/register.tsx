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
    const [ isPasswordValid, setIsPasswordvalid ] = useState(false);

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

    }


    return (
        <div className="register">
            <div className="register__logo"></div>
            <CSSTransition
                in={!isLoading}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <div className="register__container">
                    <form className="register__container_form">
                        <div className="form">
                            <div className="text">
                                Username
                            </div>
                            <input value={userName} name="userName"  type="text" className="value" onChange={handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                First Name
                            </div>
                            <input value={firstName} type="text" name="firstName" className="value" onChange={handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                Last Name
                            </div>
                            <input value={lastName} type="text"  name="lastName" className="value" onChange={handleChange} autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                Password
                            </div>
                            <input type="password" className="value" autoComplete="off" required/>
                        </div>
                        <div className="form">
                            <div className="text">
                                Confirm Password
                            </div>
                            <input type="password" className="value" autoComplete="off" required/>
                            
                        </div>
                    </form>
                    <div className="register__container_button">
                        <div className="button-main">
                            <button type="submit">Register</button>
                            <svg>
                                <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default withRouter(Register);