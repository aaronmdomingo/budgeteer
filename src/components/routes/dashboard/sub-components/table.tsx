import React from 'react';
import Expense from './expense';

const Table = (props: any) => {
    const { monthName, expenseArr } = props;

    return (
        <div className="dashboard__table">
            <div className="dashboard__table_container">
                <div className="dashboard__table_container-header">
                    { monthName }
                </div>
                <div className="dashboard__table_container-body">
                    {
                        expenseArr.map((e: any) => {
                            return <Expense key={e._id}
                                expense={e}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Table;