import React, { useState } from 'react';

const ExpenseForm = (props: any) => {
    const { expenseFormHandler, addExpense } = props;
    const [ value, setValue ] = useState('');
    const [ description, setDescription ] = useState('')

    const handleChange = (event: any) => {
        switch(event.target.name) {
            case 'text':
                setDescription(event.target.value);
                break;
            case 'value':
                setValue(event.target.value);
                break;
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const expense = {
            description: description,
            value: parseInt(value)
        }
        addExpense(expense);
        handleClear();
    }

    const handleClear = () => {
        setValue('');
        setDescription('');
    }


    return (
        <form className="dashboard__form" onSubmit={handleSubmit} >
            <span className="dashboard__form-close" onClick={() => expenseFormHandler()}>
                <i className="far fa-times-circle"></i>
            </span>
            <div className="dashboard__form-text">
                <input type="text" name="text" placeholder='Description' value={description} onChange={handleChange} autoComplete="off" required/>
            </div>
            <div className="dashboard__form-value">
                <input type="number"  name="value" min="0" placeholder='Value' value={value} onChange={handleChange} required/>
            </div>
            <div className="dashboard__form-button">
                <button type="submit">
                    <i className="fas fa-plus-square"></i>
                </button>
            </div>
        </form>
    )
}

export default ExpenseForm;
