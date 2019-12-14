import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';
import './_landing-page.scss';


const LandingPage = (props: any) => {
    const [ isClicked, setIsClicked ] = useState(false);
    const [ userCookie, setUserCookie, removeUserCookie ] = useCookies(['current-user']);
    const { isLoggedIn, logOutUser } = props;
    const hasCookie = userCookie['current-user'];

    const clickHandler = (bool: boolean) => {
        setIsClicked(bool);
    }

    useEffect(() => {
        if (userCookie['current-user']) {
            clickHandler(true);
        }
    }, [userCookie])

    const logIn = (userName: string) => {
        const date = new Date();
        const month = date.getMonth();
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthsArr[month];
        props.logInUser(userName);
        props.history.push(`/dashboard/${userName}/${monthName}`);
        setUserCookie('current-user', userName);
    }

    const logOut = () => {
        removeUserCookie('current-user');
        logOutUser();
        clickHandler(false);
    }

    return (
        <div className="landing__page">
            <div className="landing__page_logo"></div>
            <div className="landing__page_slogan">Save that money.</div>
            { isClicked
            ? ''
            :
                <div className="landing__page_actions" onClick={() => clickHandler(true)}>
                <div className="button-main">
                    <span>Get Started</span>
                    <svg>
                        <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                        <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                    </svg>
                </div>
            </div>
            }
            <CSSTransition
                in={isClicked}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <div className="landing__page_login">
                    <div className="button-main" onClick={hasCookie || isLoggedIn  ? () => logIn(`${userCookie['current-user']}`) : () => {props.history.push('/register')} }>
                        <span>
                            {
                                hasCookie || isLoggedIn ? 'Dashboard' : 'Register'
                            }
                        </span>
                        <svg>
                            <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                        </svg>
                    </div>
                    <div className="button-main" onClick={hasCookie || isLoggedIn ? () => logOut() : () => {props.history.push('/login')} }>
                        <span>
                            {
                                hasCookie || isLoggedIn ? 'Log out' : 'Log in'
                            }
                        </span>
                        <svg>
                            <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                        </svg>
                    </div>
                    {
                        hasCookie || isLoggedIn
                        ? ''
                        : <div className="landing__page_login-guest">
                            Don't have an account?
                            <span onClick={() => logIn('Guest')} >Log in as Guest</span>
                        </div>
                    }
                </div>
            </CSSTransition>
        </div>
    )
}

export default withRouter(LandingPage);
