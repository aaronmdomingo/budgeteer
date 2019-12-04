import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import SideBar from './side-bar';
import './_dashboard.scss';
import { useCookies } from 'react-cookie';

const Dashboard = (props: any) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const [today, setToday] = useState('');
    const [userCookie] = useCookies(['current-user']);
    const { isLoggedIn, currentUser } = props;
    const sideBarHandler = () => {
        setShowSideBar(!showSideBar);
    }

    const getDate = () => {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        setToday(`${mm} / ${dd} / ${yyyy}`);
    }

    const fetchData = () => {
        fetch('http://localhost:4000/api/expense')
            .then(res => console.log(res));
    }

    useEffect(() => {
        getDate();
        fetchData();
    }, []);

    if (!userCookie['current-user'] && !isLoggedIn) {
        return <Redirect to='/' />
    }

    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <div className="dashboard__header_menu">
                <i className="fas fa-bars" onClick={sideBarHandler} ></i>
                </div>
                <div className="dashboard__header_user_info">
                    <div className="dashboard__header_user_info-name">
                        { currentUser || userCookie['current-user'] }
                    </div>
                    <div className="dashboard__header_user_info-date">
                        { today }
                    </div>
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
