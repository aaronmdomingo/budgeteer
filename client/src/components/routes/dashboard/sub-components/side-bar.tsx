import React from 'react';
import Month from './month';
import { Link } from 'react-router-dom';

const SideBar = (props: any) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="dashboard__sidebar">
            <Link to='/' className="dashboard__sidebar_logo" />
            <div className="dashboard__sidebar_months">
                {
                    months.map((e, index) => {
                        return <Month key={index}
                        month={e}
                        sideBarHandler={props.sideBarHandler}/>
                    })
                }
            </div>
            <div className="dashboard__sidebar_exit">
                <i className="far fa-times-circle" onClick={() => props.sideBarHandler()}></i>
            </div>
        </div>
    )
}

export default SideBar;
