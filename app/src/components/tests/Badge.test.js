import React from 'react'
import { render, screen } from '@testing-library/react'
import ReactDOM from 'react-dom'
import Badge from '../Badge'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Badge />, div)
})

it('renders child content', () => {
  render(<Badge>hello</Badge>)
  expect(screen.getByText('hello')).toBeInTheDocument()
})