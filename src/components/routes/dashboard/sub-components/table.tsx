import React, { useState, useEffect } from 'react';
import Expense from './expense';
import { animateScroll } from 'react-scroll';

const Table = (props: any) => {
    const { monthName, user, expenseArr, expenseFormHandler, isLoading, deleteExpense, updateExpense } = props;
    const [ currentTab, setCurrentTab ] = useState(0);
    const [ budget, setBudget ] = useState(0);
    const [ expense, setExpense ] = useState(0);
    const [ status, setStatus ] = useState('');
    const [ headerClass, setHeaderClass ] = useState('');

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
                changeStatus(totalExpense / res.current_budget);
            })
            .catch(err => alert(err));
    }

    const changeStatus = (num: number) => {
        switch(true) {
            case num === 0:
                setStatus('Perfect. Clean Slate!');
                setHeaderClass('white');
                break;
            case num < .20:
                setStatus(`You're doing great, keep up the good work!`);
                setHeaderClass('green');
                break;
            case num < .40:
                setStatus(`You're still doing okay, you got this!`);
                setHeaderClass('green-orange');
                break;
            case num < .60:
                setStatus(`Around halfway to your budget, hang in there!`);
                setHeaderClass('orange');
                break;
            case num < .80:
                setStatus(`Got a little bit of wiggle room left!`);
                setHeaderClass('orange-red');
                break;
            case num < 1:
                setStatus(`You're cutting it really close now!`);
                setHeaderClass('red');
            case num > 1:
                setStatus(`Oh no! You went over for this month!`);
                setHeaderClass('really-red');
                break;
            default:
                setStatus('');
                setHeaderClass('');
        }
    }

    const toggleView = (id: number) => {
        currentTab === id ? setCurrentTab(0) : setCurrentTab(id);
    }

    return (
        <div className="dashboard__table">
            <div className="dashboard__table_container">
                <div className={`dashboard__table_container-header ${headerClass}`}>
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
                        { status }
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
