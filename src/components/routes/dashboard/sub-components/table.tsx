import React, { useState, useEffect } from 'react';
import Expense from './expense';
import { animateScroll } from 'react-scroll';

const Table = (props: any) => {
    const { monthName, expenseArr, expenseFormHandler, isLoading, deleteExpense } = props;
    const [ currentTab, setCurrentTab ] = useState(0);

    useEffect(() => {
        animateScroll.scrollToBottom({ duration: 1500, containerId: 'dashboard--table' });
    }, [isLoading, expenseArr])

    const toggleView = (id: number) => {
        currentTab === id ? setCurrentTab(0) : setCurrentTab(id);
    }

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
                                id={e._id}
                                expense={e}
                                currentTab={currentTab}
                                toggleView={toggleView}
                                deleteExpense={deleteExpense}
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
