import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../../App';

const Month = (props: any) => {
    const { currentUser, currentMonth, setMonth } = useContext(UserContext);

    const goToMonth = () => {
        setMonth(props.month);
        props.history.push(`/dashboard/${currentUser}/${props.month}`);
        props.sideBarHandler();
    }

    return (
    <div className={`dashboard__sidebar_months_val ${props.month === currentMonth ? 'current' : ''}`} onClick={goToMonth}>
        {props.month}
    </div>
    )
}

export default withRouter(Month);
