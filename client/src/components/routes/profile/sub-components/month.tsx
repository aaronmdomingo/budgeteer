import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';


const Month = (props: any) => {
    const { monthName, addCommas } = props;
    const { user } = useParams();
    const [ expense, setExpense ] = useState(0);

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
    }, [])

    return (
        <div className="month__tab">
            <div>
                <span onClick={() => props.history.push(`/dashboard/${user}/${monthName}`)}> { monthName } </span>
            </div>
            <div>
                { addCommas(expense) }
            </div>
        </div>
    )
}

export default withRouter(Month);