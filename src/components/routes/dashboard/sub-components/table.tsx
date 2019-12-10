import React, { useState, useEffect } from 'react';
import Expense from './expense';
import { animateScroll } from 'react-scroll';

const Table = (props: any) => {
    const { monthName, user, expenseArr, expenseFormHandler, isLoading, deleteExpense, updateExpense } = props;
    const [ currentTab, setCurrentTab ] = useState(0);
    const [ budget, setBudget ] = useState(0);
    const [ expense, setExpense ] = useState(0);
    const [ status, setStatus ] = useState('');

    useEffect(() => {
        setCurrentTab(0);
        animateScroll.scrollToBottom({ duration: 1500, containerId: 'dashboard--table' });
        fetchBudget();
    }, [isLoading, expenseArr])

    const fetchBudget = () => {
        fetch(`/api/month/${user}/${monthName}`)
            .then(res => res.json())
            .then(res => {
                let totalExpense = 0;
                expenseArr.forEach((e :any) => totalExpense += e.value)
                setExpense(totalExpense);
                setBudget(res.current_budget - totalExpense);
            })
            .catch(err => alert(err));
    }

    const changeStatus = (num: number) => {
    }

    const toggleView = (id: number) => {
        currentTab === id ? setCurrentTab(0) : setCurrentTab(id);
    }

    return (
        <div className="dashboard__table">
            <div className="dashboard__table_container">
                <div className="dashboard__table_container-header">
                    <div className="month">
                    { monthName }
                    </div>
                    <div className="budget">
                        <div className="text">
                            Available Budget:
                        </div>
                        <div className="value">
                            { budget }
                        </div>
                    </div>
                    <div className="total-expense">
                        <div className="text">
                            Total Expenses:
                        </div>
                        <div className="value">
                            {  expense }
                        </div>
                    </div>
                    <div className="status">
                        You're doing a good job so far, keep at it!
                    </div>
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
                                updateExpense={updateExpense}
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
