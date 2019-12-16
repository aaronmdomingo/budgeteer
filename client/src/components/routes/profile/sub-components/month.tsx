import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';

const Month = (props: any) => {
    const { monthName, addCommas } = props;
    const { user } = useParams();
    const [ expense, setExpense ] = useState(0);
    const [ budget, setBudget ] = useState(0);
    let monthClass = '';
    let percentage = expense / budget;

    useEffect(() => {
        fetch(`/api/expense/${user}/${monthName}`)
            .then(res => res.json())
            .then(res => {
                if (!res.error) {
                    let totalExpense = 0;
                    res.forEach((e:any) => totalExpense += e.value);
                    setExpense(totalExpense);
                }
            })
            .catch(err => alert(err));
        
        fetch(`/api/month/${user}/${monthName}`)
            .then(res => res.json())
            .then(res => {
                if (!res.error) {
                    setBudget(res.current_budget);
                }
            })
            .catch(err => alert(err));
    }, [])

    switch(true) {
        case percentage === 0:
            monthClass = '';
            break;
        case percentage < .20:
            monthClass = 'mod-green';
            break;
        case percentage < .40:
            monthClass = 'mod-green-orange';
            break;
        case percentage < .60:
            monthClass = 'mod-orange';
            break;
        case percentage < .80:
            monthClass = 'mod-orange-red';
            break;
        case percentage < 1:
            monthClass = 'mod-red';
            break;
        case percentage > 1 || percentage === 1:
            monthClass = 'mod-really-red';
            break;
        default:
            monthClass = '';
    }

    return (
        <div className={`month__tab ${monthClass}`}>
            <div className="month">
                <span onClick={() => props.history.push(`/dashboard/${user}/${monthName}`)}> { monthName } </span>
            </div>
            <div className="budget">
                { addCommas(budget) }
            </div>
            <div className="expense">
                { addCommas(expense) }
            </div>
        </div>
    )
}

export default withRouter(Month);