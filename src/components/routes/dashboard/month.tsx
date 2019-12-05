import React, { useContext } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { useCookies } from 'react-cookie';

const Month = (props: any) => {
    const { currentUser } = useContext(UserContext);
    const [ userCookie ] = useCookies(['current-user']);
    const { monthName } = useParams();

    const goToMonth = () => {
        props.history.push(`/dashboard/${currentUser || userCookie['current-user'] }/${props.month}`);
        props.sideBarHandler();
    }

    return (
    <div className={`dashboard__sidebar_months_val ${props.month === monthName ? 'current' : ''}`} onClick={goToMonth}>
        {props.month}
    </div>
    )
}

export default withRouter(Month);
