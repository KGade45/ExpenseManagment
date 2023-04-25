import React from 'react'

const Analytics = ({allTransaction}) => {
    const totalTransaction = allTransaction.length;
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type === 'income');
    const totalExpenseTransaction = allTransaction.filter(transaction => transaction.type === 'expence');
    const totalIncomePercent = (totalIncomeTransaction/totalTransaction)*100;
    const totalExpensePercent = (totalExpenseTransaction/totalTransaction)*100;

  return (
    <>
        <div className='row'>
            <div className='col-md-4'>
                <div className='card'>
                    <div className='card-header'>
                        Total Transaction = {totalTransaction}
                    </div>
                    <div className='card-body'>
                        <h5>Income Transaction : {totalIncomeTransaction.length}</h5>
                        <h5>Expense Transaction : {totalExpenseTransaction.length}</h5>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Analytics