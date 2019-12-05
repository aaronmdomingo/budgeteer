import React, { useState, useEffect } from 'react';
import { withRouter, Redirect, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useCookies } from 'react-cookie';

import './_dashboard.scss';

import SideBar from './sub-components/side-bar';
import Table from './sub-components/table';

const Dashboard = (props: any) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const [today, setToday] = useState('');
    const [expenseArr, setExpenseArr] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [userCookie] = useCookies(['current-user']);
    const { user, monthName } = useParams();
    const { isLoggedIn } = props;
    const sideBarHandler = () => {
        setShowSideBar(!showSideBar);
    }

    const getDate = () => {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); 
        const yyyy = date.getFullYear();

        setToday(`${mm} / ${dd} / ${yyyy}`);
    }

    const fetchExpenses = () => {
        fetch(`/api/expense/${user}/${monthName}`)
            .then(res => res.json())
            .then(res => {
                setExpenseArr(res);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        setIsLoading(true);
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
                        { user }
                    </div>
                    <div className="dashboard__header_user_info-date">
                        { today }
                    </div>
                </div>
            </div>
            <CSSTransition
                in={!isLoading}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <Table expenseArr={expenseArr} monthName={monthName} />
            </CSSTransition>
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
