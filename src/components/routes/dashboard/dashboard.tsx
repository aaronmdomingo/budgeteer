import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Redirect, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../App';

import SideBar from './side-bar';
import './_dashboard.scss';

const Dashboard = (props: any) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const [today, setToday] = useState('');
    const [expenseArr, setExpenseArr] = useState([]);
    const [userCookie] = useCookies(['current-user']);
    const { currentUser } = useContext(UserContext);
    const { user, monthName } = useParams();
    const { isLoggedIn } = props;
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

    const fetchExpenses = () => {
        fetch(`/api/expense/${user}/${monthName}`)
            .then(res => res.json())
            .then(res => {
                setExpenseArr(res);
            });
    }

    useEffect(() => {
        getDate();
        fetchExpenses();
    }, [user, monthName]);

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
