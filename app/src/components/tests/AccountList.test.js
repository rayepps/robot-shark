import React from 'react'
import ReactDOM from 'react-dom'
import AccountList from '../AccountList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AccountList />, div)
})