import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  border-radius: 4px;
  border: none;
  padding: 3px;
  background-color: ${({ colorCode }) => colorCode};
  display: inline-block;
  > span {
    font-size: .82em;
  }
`

const COLOR_MAP = {
  yellow: 'yellow',
  blue: '#b2e9f9',
  green: '#c9ffc9',
  red: 'red'
}

export default function Badge ({ children, color = 'yellow' }) {

  const colorCode = COLOR_MAP[color]

  return (
    <Container colorCode={colorCode}>
      <span>{children}</span>
    </Container>
  )
}