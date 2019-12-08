import React from 'react';

const SubExpense = (props: any) => {
    const { currentTab, id } = props;
    return (
        <div className={`dashboard__table_expense-sub ${ currentTab === id ? 'open' : ''  }`}>

        </div>
    )
}

export default SubExpense;