import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

const SubExpense = (props: any) => {
    const { match, deleteHandler } = props;
    const [ inEdit, setInEdit ] = useState(false);
    const [ inDelete, setInDelete ] = useState(false);

    useEffect(() => {
        setInEdit(false);
        setInDelete(false);
    }, [match])

    return (
        <div className={`dashboard__table_expense-sub ${ match ? 'open' : ''  }`}>
            <CSSTransition
                in={inEdit}
                timeout={500}
                classNames="update"
                unmountOnExit>
                <form className={'dashboard__table_expense-form'}>

                </form>
            </CSSTransition>
            <CSSTransition
                in={!inEdit && !inDelete}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <div className="button" onClick={() => setInEdit(true)}> Update </div>
            </CSSTransition>
            <CSSTransition
                in={!inEdit && !inDelete}
                timeout={500}
                classNames="fade"
                unmountOnExit>
                <div className="button button-delete" onClick={() => setInDelete(true)}> Delete </div>
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
                        <div className="button button-mini button-delete" onClick={() => deleteHandler()}>
                            Yes
                        </div>
                        <div className="button button-mini" onClick={() => setInDelete(false)}>
                            No
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default SubExpense;
