import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './_dashboard.scss';


const Dashboard = (props: any) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
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
                appear={showSideBar}
                timeout={800} 
                classNames="fade"
                unmountOnExit>
                {/* {
                    state => (
                       <div className="dashboard__sidebar">
                           .dashboard__side
                       </div>
                    )
                } */}
                <div className="dashboard__sidebar">
                           .dashboard__side
                       </div>
            </CSSTransition>
        </div>
    )
}

export default withRouter(Dashboard);