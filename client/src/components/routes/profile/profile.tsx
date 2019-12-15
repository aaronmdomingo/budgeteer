import React, { useState, useEffect } from 'react';
import { withRouter, useParams, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CSSTransition } from 'react-transition-group';

import Month from './sub-components/month';
import './_profile.scss';

const Profile = (props: any) => {
    const { user } = useParams();
    const [ currentUser, setCurrentUser ] = useState({
        user_name: '',
        first_name: '',
        last_name: ''
    });
    const [ isDoneLoading, setIsDoneLoading ] = useState(false);
    const [ userCookie,, removeUserCookie ] = useCookies(['current-user']);
    const [ totalSpent, setTotalSpent ] = useState(0);
    const { isLoggedIn, logOutUser } = props;
    const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        getUserInfo();
        setIsDoneLoading(true);
    }, [])

    const getUserInfo = () => {
        fetch(`/api/user/${user}`)
            .then(res => res.json())
            .then(res => {
                if (!res.error) {
                    let totalExpense = 0;
                    res.totalExpenses.forEach((e :any) => totalExpense += e.value)
                    setCurrentUser(res);
                    setTotalSpent(totalExpense);
                }
            })
            .catch(err => alert(err));
    }

    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const logOut = () => {
        removeUserCookie('current-user', {path: '/'});
        logOutUser();
    }

    if (!userCookie['current-user'] && !isLoggedIn) {
        return <Redirect to='/' />
    }
    
    return (
        <div className="profile">
            <div className="profile__username">
                { user }
                <div className="name" >
                { `${currentUser.first_name} ${currentUser.last_name}` }
                </div>
            </div>
            <div className="profile__stats">
                <div className="amount" >
                    Yearly Budget : { addCommas(totalSpent) }
                </div>
                <div className="amount" >
                    Yearly Expense : { addCommas(totalSpent) }
                </div>
            </div>
            <CSSTransition
            in={isDoneLoading}
            timeout={500}
            classNames="fade"
            unmountOnExit>
                <div className="profile__months">
                    <div className="profile__months_container">
                        <div className="month__header">
                            <div>Month</div>
                            <div>Expense</div>
                        </div>
                        {
                            monthsArr.map((e, index) => {
                                return <Month key={index} 
                                monthName={e} 
                                addCommas={addCommas}/>;
                            })
                        }
                    </div>
                </div>
            </CSSTransition>
            <div className="profile__logout" onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i>
            </div>
        </div>
    )
}

export default withRouter(Profile);