import React from 'react';
import SubExpense from './expense-sub';

const Expense = (props: any) => {
    const { expense, toggleView, id, currentTab, deleteExpense } = props;

    const date = expense.date.split('T')[0].split('-');
    const formattedDate = `${date[1]}/${date[2]}`;

    const clickHandler = () => {
        toggleView(id);
    }

    const deleteHandler = () => {
        deleteExpense(id);
    }

    return (
        <div className="dashboard__table_expense_container">
            <div className="dashboard__table_expense" onClick={clickHandler} >
                <div className="dashboard__table_expense-date">
                    { formattedDate }
                </div>
                <div className="dashboard__table_expense-description">
                    { expense.description }
                </div>
                <div className="dashboard__table_expense-value">
                    { expense.value }
                </div>
            </div>
            <SubExpense
            match = { currentTab === id }
            deleteHandler = { deleteHandler }
            />
        </div>
    )
}

export default Expense;
