import React from 'react';

const ExpenseForm = (props: any) => {
    const { expenseFormHandler } = props;

    return (
        <form className="dashboard__form">
            <span className="dashboard__form-close" onClick={() => expenseFormHandler()}>
                <i className="far fa-times-circle"></i>
            </span>
            <div className="dashboard__form-text">
                <input type="text" placeholder='What did you spend money on?' />
            </div>
            <div className="dashboard__form-button">
                <i className="fas fa-plus-square"></i>
            </div>
        </form>
    )
}

export default ExpenseForm;