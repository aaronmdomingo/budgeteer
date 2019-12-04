import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import SideBar from './side-bar';
import './_dashboard.scss';
import { useCookies } from 'react-cookie';

const Dashboard = (props: any) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const { isLoggedIn } = props;

    const sideBarHandler = () => {
        setShowSideBar(!showSideBar);
    }

    const [ userCookie ] = useCookies(['current-user']);

    if (!userCookie['current-user'] || !isLoggedIn) {
        return <Redirect to='/' />
    }

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <div className="dashboard__header_menu">
                <i className="fas fa-bars" onClick={sideBarHandler} ></i>
                </div>
                <div className="dashboard__header_user_info">

                </div>
            </div>
            <div className="dashboard__main">

            </div>
            <CSSTransition
                in={showSideBar}
                timeout={500}
                classNames="sidebar"
                unmountOnExit>
                <SideBar sideBarHandler={sideBarHandler}/>
            </CSSTransition>
        </div>
    )
}

export default withRouter(Dashboard);
