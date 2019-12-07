import React from 'react';

const Expense = (props: any) => {
    const { expense } = props;

    const date = expense.date.split('T')[0].split('-');
    const formattedDate = `${date[1]}/${date[2]}`;

    return (
        <div className="dashboard__table_expense">
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
    )
}

export default Expense;