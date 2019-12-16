import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const SubExpense = (props: any) => {
    const { match, deleteHandler, expense, updateExpense, id } = props;
    const [ inEdit, setInEdit ] = useState(false);
    const [ inDelete, setInDelete ] = useState(false);
    const [ updatedDescription, setUpdatedDescription ] = useState(expense.description);
    const [ updatedValue, setUpdatedValue ] = useState(expense.value);

    useEffect(() => {
        setInEdit(false);
        setInDelete(false);
    }, [match])

    const handleChange = (event: any) => {
        switch (event.target.name) {
            case 'description':
                setUpdatedDescription(event.target.value);
                break;
            case 'value':
                setUpdatedValue(event.target.value);
                break;
        }
    }

    const handleUpdate = (event: any) => {
        event.preventDefault();
        const updateInfo = {
            id : id,
            description: updatedDescription,
            value: parseInt(updatedValue)
        }
        updateExpense(updateInfo);
        handleClear();
    }

    const handleClear = () => {
        setUpdatedDescription('');
        setUpdatedValue('');
    }
    
    return (
        <div className={`dashboard__table_expense-sub ${ match ? 'open' : ''  }`}>
            <CSSTransition
                in={inEdit}
                timeout={500}
                classNames="update"
                unmountOnExit>
                <form className={'dashboard__table_expense-form'} onSubmit={handleUpdate} >
                    <div className="text">
                        <input className="description" value={updatedDescription} type="text" name="description" placeholder="description" onChange={handleChange} autoComplete="off" min="1" required />
                        <input className="value" value={updatedValue} type="number" name="value" placeholder="value" onChange={handleChange} required/>
                    </div>
                    <div>
                        <div className="button-table button-mini button-update">
                            <button type="submit"> Update </button>
                        </div>
                        <div className="button-table button-mini" onClick={() => setInEdit(false)}>
                            Cancel
                        </div>
                    </div>
                </form>
            </CSSTransition>
            <CSSTransition
                in={!inEdit && !inDelete}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <div className="button-table" onClick={() => setInEdit(true)}> Update </div>
            </CSSTransition>
            <CSSTransition
                in={!inEdit && !inDelete}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <div className="button-table button-delete" onClick={() => setInDelete(true)}> Delete </div>
            </CSSTransition>
            <CSSTransition
                in={inDelete}
                timeout={500}
                classNames="delete"
                unmountOnExit>
                <div className="dashboard__table_expense-confirm">
                    <div className="text">
                        Are you sure you want to delete this expense?
                    </div>
                    <div>
                        <div className="button-table button-mini button-delete" onClick={() => deleteHandler()}>
                            Yes
                        </div>
                        <div className="button-table button-mini" onClick={() => setInDelete(false)}>
                            No
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default SubExpense;
