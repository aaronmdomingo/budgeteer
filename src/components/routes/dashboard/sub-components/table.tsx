import React, { useEffect } from 'react';
import Expense from './expense';
import { animateScroll } from 'react-scroll';

const Table = (props: any) => {
    const { monthName, expenseArr, expenseFormHandler } = props;

    useEffect(() => {
        animateScroll.scrollToBottom({ duration: 1000, containerId: 'dashboard--table' });
    }, [expenseArr])

    return (
        <div className="dashboard__table">
            <div className="dashboard__table_container">
                <div className="dashboard__table_container-header">
                    { monthName }
                </div>
                <div className="dashboard__table_container-body" id="dashboard--table">
                    {
                        expenseArr.map((e: any) => {
                            return <Expense key={e._id}
                                expense={e}
                            />
                        })
                    }
                </div>
            </div>
            <div className="dashboard__table_footer">
                <i className="far fa-plus-square" onClick={() => expenseFormHandler()} ></i>
            </div>
        </div>
    )
}

export default Table;