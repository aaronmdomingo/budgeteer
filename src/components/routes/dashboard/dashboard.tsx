import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import SideBar from './side-bar';
import './_dashboard.scss';


const Dashboard = (props: any) => {
    const [showSideBar, setShowSideBar] = useState(false);

    const sideBarHandler = () => {
        setShowSideBar(!showSideBar);
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
