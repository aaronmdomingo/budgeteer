import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './_landing-page.scss';


const LandingPage = ({props}: any) => {
    const [ isClicked, setIsClicked ] = useState(false);

    const clickHandler = () => {
        setIsClicked(true);
    }

    const element = isClicked 
    ? 
    <CSSTransition 
        in={isClicked} 
        apprea={isClicked}
        timeout={800} 
        classNames="fade"
        unmountOnExit>
        {
            state => (
                <div className="landing__page_login">
                    <button className="landing__page_login-register">
                        Register
                    </button>
                    <button className="landing__page_login-login">
                        Login
                    </button>
                    <div className="landing__page_login-guest">
                        Log in as a guest
                    </div>
                </div>
            )
        }
    </CSSTransition>
    : 
    <div className="landing__page_button" onClick={clickHandler}>
        <span>Get Started</span>
        <svg>
            <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
            <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
        </svg>
    </div>;

    return (
        <div className="landing__page">
            <div className="landing__page_logo"></div>
            <div className="landing__page_slogan">Save that money.</div>
            { isClicked 
            ? ''
            :  
            <div className="landing__page_button" onClick={clickHandler}>
                <span>Get Started</span>
                <svg>
                    <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                    <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                </svg>
            </div> 
            }
            <CSSTransition 
                in={isClicked} 
                appear={isClicked}
                timeout={800} 
                classNames="fade"
                unmountOnExit>
                {
                    state => (
                        <div className="landing__page_login">
                            <div className="landing__page_button landing__page_button-sub">
                                <span>Register</span>
                                <svg>
                                    <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                    <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                </svg>
                            </div> 
                            <div className="landing__page_button landing__page_button-sub">
                                <span>Log in</span>
                                <svg>
                                    <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                    <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                </svg>
                            </div> 
                            <div className="landing__page_login-guest">
                                Don't have an account?
                                <span>Log in as guest</span>
                            </div>
                        </div>
                    )
                }
            </CSSTransition>
        </div>
    )
}

export default LandingPage;