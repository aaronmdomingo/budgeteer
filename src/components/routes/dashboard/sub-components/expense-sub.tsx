import React from 'react';

const SubExpense = (props: any) => {
    const { match, deleteHandler } = props;
    return (
        <div className={`dashboard__table_expense-sub ${ match ? 'open' : ''  }`}>
            <div className="button button-update">
                Update
            </div>
            <div className="button button-delete" onClick={() => deleteHandler()}>
                Delete
            </div>
        </div>
    )
}

export default SubExpense;
