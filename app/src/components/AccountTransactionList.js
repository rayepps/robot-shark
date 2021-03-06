import React from 'react'
import styled from 'styled-components'
import currency from 'currency.js'


const Container = styled.div`
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 10px;
  > h3 {
    font-size: .88em;
  }
  > table {
    width: 100%;
    border-collapse: collapse;
    tr {
      padding: 5px 0;
      border-bottom: 1px solid #eaeaea;
      > td {
        padding: 10px 0;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`

export default function AccountTransactionList ({ account, transactions = [] }) {

  return (
    <Container>
      <h3>Recent Transactions</h3>
      <table>
        <tbody>
          {transactions.map((trans) => (
            <tr key={trans.transaction_id} className="rs-account-transaction-list-item">
              <td><span>{trans.date}</span></td>
              <td><span>{currency(trans.amount).format()}</span></td>
              <td><span>{trans.merchant_name}</span></td>
              <td><span>{trans.name}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}