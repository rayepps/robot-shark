import React from 'react'
import styled from 'styled-components'
import currency from 'currency.js'
import Badge from './Badge'


const Container = styled.div`
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  > div.rs-account-summary-left {
    flex: 1;
  }
  > div.rs-account-summary-right {

  }
  div.rs-account-summary-badges {
    > div {
      margin-right: 5px;
    }
  }
  span.rs-account-summary-name {
    font-size: 1.5em;
  }
  span.rs-account-summary-description {
    font-size: .88em;
    color: grey;
  }

  div.rs-account-summary-money {
    display: flex;
    flex-direction: column;
    align-items: center;
    > span.rs-account-summary-balance {
      font-size: 2em;
    }
    > span.rs-account-summary-available {
      font-size: .74em;
      color: grey;
    }
  }
`

export default function AccountSummary ({ account, institution }) {

  if (!account || !institution) return (
    <></>
  )

  return (
    <Container>
      <div className="rs-account-summary-left">
        <div className="rs-account-summary-badges">
          <Badge color="green">{institution.name}</Badge>
          <Badge color="blue">{account.subtype}</Badge>
        </div>
        <span className="rs-account-summary-name">{account.name}</span>
        <br />
        <span className="rs-account-summary-description">{account.official_name}</span>
      </div>
      <div className="rs-account-summary-right rs-account-summary-money">
        <span className="rs-account-summary-balance">
          {currency(account.balances.current).format()}
        </span>
        {account.balances.available && (
          <span className="rs-account-summary-available">
            {currency(account.balances.available).format()} available
          </span>
        )}
      </div>
    </Container>
  )
}