import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';
import './_landing-page.scss';


const LandingPage = (props: any) => {
    const [ isClicked, setIsClicked ] = useState(false);
    const [ userCookie, setUserCookie ] = useCookies(['current-user']);

    const clickHandler = () => {
        setIsClicked(true);
    }

    useEffect(() => {
        if (userCookie['current-user']) {
            clickHandler();
        }
    }, [userCookie])

    const logIn = (userName: string) => {
        const date = new Date();
        const month = date.getMonth();
        const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = monthsArr[month];
        props.logInUser(userName);
        props.setMonth(monthName);
        props.history.push(`/dashboard/${userName}/${monthName}`);
        setUserCookie('current-user', userName);
    }

    return (
        <div className="landing__page">
            <div className="landing__page_logo"></div>
            <div className="landing__page_slogan">Save that money.</div>
            { isClicked
            ? ''
            :
            <div className="landing__page_actions" onClick={clickHandler}>
                <div className="landing__page_button">
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
                appear={isClicked}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <div className="landing__page_login">
                    <div className="landing__page_button">
                        <span>Register</span>
                        <svg>
                            <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                        </svg>
                    </div>
                    <div className="landing__page_button">
                        <span>Log in</span>
                        <svg>
                            <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                        </svg>
                    </div>
                    <div className="landing__page_login-guest">
                        Don't have an account?
                        <span onClick={() => logIn('guest')} >Log in as guest</span>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default withRouter(LandingPage);
