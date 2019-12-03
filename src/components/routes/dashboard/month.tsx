import React from 'react';
import { withRouter } from 'react-router-dom';

const Month = (props: any) => {
    const goToMonth = () => {
        props.setMonth(props.month);
        props.history.push(`/dashboard/${props.currentUser}/${props.month}`);
    }

    return (
    <div className={`dashboard__sidebar_months_val ${props.month === props.currentMonth ? 'current' : '' }`} onClick={goToMonth}>
        {props.month}
    </div>
    )
}

export default withRouter(Month);