import React from 'react'
import Recoil from 'recoil'
import styled from 'styled-components'
import api from '../../api'
import useFetch from '../../hooks/useFetch'
import AccountList from '../../components/AccountList'
import AccountSummary from '../../components/AccountSummary'
import AccountTransactionList from '../../components/AccountTransactionList'


const Container = styled.div`
  background-color: #F8F8F8;
  min-height: 100vh;
  display: flex;
  justify-content: center; 

  > div.rs-dashboard-content {
    width: 80%;
    min-width: 800px;
  }

  div.rs-dashboard-split {
    display: flex;
    margin-top: 20px;
    > div.rs-dashboard-split-left {
      width: 30%;
      margin-right: 20px;
    }
    > div.rs-dashboard-split-right {
      flex: 1;
    }
  }
`

const StyledHeader = styled.header`
  > img {
    width: 100px;
  }
  > h1 {
    font-size: 1em;
  }
`

export default function Dashboard ({ }) {

  const request = useFetch(async () => {
    const { transactions } = await api.listTransactions()
    const { accounts } = await api.listAccounts()
    const { institution } = await api.getInstitution()
    return {
      transactions,
      accounts,
      institution,
      status: { ok: true }
    }
  })
  const [currentAccount, setCurrentAccount] = React.useState(null)

  const { 
    loading,
    response,
    error
  } = request

  const fetchAccounts = async () => {
    const { accounts } = await request.fetch()
    const firstAccount = accounts[0]
    setCurrentAccount(firstAccount)
  }

  React.useEffect(() => {
    fetchAccounts()
  }, [])

  const onAccountClick = (account) => {
    setCurrentAccount(account)
  }

  const transactions = (currentAccount && response.transactions)
    ? response.transactions.filter(t => t.account_id === currentAccount.account_id)
    : []

  if (loading) return (
    <span>Loading...</span>
  )

  if (!loading && !response) return (
    <span>seems broke</span>
  )

  return (
    <Container>
      <div className="rs-dashboard-content">
        <StyledHeader>
          <img src="/robot-shark.jpg" />
          <h1>Robot Shark</h1>
        </StyledHeader>
        <div className="rs-dashboard-split">
          <div className="rs-dashboard-split-left">
            <AccountList 
              accounts={response?.accounts}
              onAccountClick={onAccountClick} />
          </div>
          <div className="rs-dashboard-split-right">
            <AccountSummary account={currentAccount} institution={response?.institution} />
            <AccountTransactionList account={currentAccount} transactions={transactions} />
          </div>
        </div>
      </div>
    </Container>
  )
}