import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';

import './_login.scss';

const Login = (props: any) => {
    const { logInUser, isLoggedIn, history } = props;
    const { message } = history.location.state || '';
    const [ isDoneLoading, setIsDoneLoading ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ userStatus, setUserStatus ] = useState(message);
    const [ hasError, setHasError ] = useState(false);
    const [userCookie, setUserCookie ] = useCookies(['current-user']);

    useEffect(() => {
        setIsDoneLoading(true);
    }, [isLoggedIn]);

    const logIn = (userObj: any) => {
        const { username } = userObj;
        fetch(`/api/user/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userObj) })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    const date = new Date();
                    const month = date.getMonth();
                    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                    const monthName = monthsArr[month];
                    logInUser(username);
                    history.push(`/dashboard/${username}/${monthName}`);
                    setHasError(false);
                    setUserCookie('current-user', userName, {path: '/'});
                } else {
                    setUserStatus(res.error);
                    setHasError(true);
                    clearInputs();
                }
            })
    }

    const handleChange = (event: any) => {
        switch(event.target.name) {
            case 'username':
                setUserName(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const userObj = {
            username: userName,
            password: password
        }
        logIn(userObj);
    }

    const clearInputs = () => {
        setUserName('');
        setPassword('');
    }

    if (userCookie['current-user'] || isLoggedIn) {
        return <Redirect to='/' />
    }

    return (
        <div className="login">
            <div className="login__logo"></div>
            <CSSTransition
            in={isDoneLoading}
            timeout={500}
            classNames="fade"
            unmountOnExit>
                <form className="login__container" onSubmit={handleSubmit}>
                    <div className="login__container_form">
                        <div className="form">
                            <input type="text" value={userName} onChange={handleChange} className={`${userName.length ? 'success' : 'danger'}`} name="username" placeholder="Username" autoComplete="off" required/>
                            {
                                userStatus ? <span className={`${hasError ? 'red' : ''}`} > {userStatus} </span> : ''
                            }
                        </div>
                        <div className="form">
                            <input type="password" value={password} onChange={handleChange} className={`${password.length ? 'success' : 'danger'}`} name="password" placeholder="Password" autoComplete="off" required/>
                        </div>
                    </div>
                    <div className="login__container_button">
                        <div className="button-main">
                            <button type="submit">Login</button>
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

export default withRouter(Login);