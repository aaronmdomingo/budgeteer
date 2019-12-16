import React, { useState } from 'react';

const Modal = (props: any) => {
    const { setShowModal, monthName, budget, budgetId, updateBudget } = props;
    const [ updatedBudget, setUpdatedBudget ] = useState(budget);

    const handleChange = (event: any) => {
        setUpdatedBudget(event.target.value);
    }

    const updateHandler = (event: any) => {
        event.preventDefault();
        const budgetObj = {
            budget: parseInt(updatedBudget),
            id: budgetId
        }

        updateBudget(budgetObj);
        setShowModal(false);
    }

    return (
        <div className="dashboard__modal">
            <form className="dashboard__modal_container" onSubmit={updateHandler}>
                <div className="text">
                    Current budget for the month of:
                </div>
                <div className="month">
                    {monthName}
                </div>
                <div className="value">
                    <input type="number" min="0" className="input" value={updatedBudget} onChange={handleChange} required/>
                </div>
                <div className="button">
                    <div className="button-table button-update">
                        <button type="submit">Update</button>
                    </div>
                    <div className="button-table button-cancel" onClick={() => setShowModal(false)}>
                        Cancel
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Modal;