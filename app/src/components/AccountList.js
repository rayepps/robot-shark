import React from 'react'
import styled from 'styled-components'
import currency from 'currency.js'


const Container = styled.div`
  > div.rs-account-list-item {
    background-color: #FFFFFF;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    > div {
      flex: 1;
      > span.rs-account-list-item-name {
        font-size: 1.2em;
        font-weight: 400;
      }
      > span.rs-account-list-item-description {
        font-size: .88em;
        color: grey;
      }
    }

    > span.rs-account-list-item-balance {
      font-size: 1.3em;
      font-weight: 500;
    }
  }
`

export default function AccountList ({ accounts = [], onAccountClick }) {

  const handleClick = (account) => () => onAccountClick(account)

  return (
    <Container>
      {accounts.map((account) => (
        <div className="rs-account-list-item" key={account.account_id} onClick={handleClick(account)}>
          <div>
            <span className="rs-account-list-item-name">{account.name}</span>
            <br />
            <span className="rs-account-list-item-description">{account.official_name}</span>
          </div>
          <span className="rs-account-list-item-balance">{currency(account.balances.current).format()}</span>
        </div>
      ))}
    </Container>
  )
}