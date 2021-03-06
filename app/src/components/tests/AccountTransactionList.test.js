import React from 'react'
import ReactDOM from 'react-dom'
import AccountTransactionList from '../AccountTransactionList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AccountTransactionList />, div)
})