import React from 'react';
import { withRouter, useParams } from 'react-router-dom';

const Month = (props: any) => {
    const { user, monthName } = useParams();

    const goToMonth = () => {
        props.history.push(`/dashboard/${user}/${props.month}`);
        props.sideBarHandler();
    }

    return (
    <div className={`dashboard__sidebar_months_val ${props.month === monthName ? 'current' : ''}`} onClick={goToMonth}>
        {props.month}
    </div>
    )
}

export default withRouter(Month);
