import React from 'react'
import styled from 'styled-components'


const StyledHeader = styled.header`
  > img {
    width: 100px;
  }
  > h1 {
    font-size: 1em;
  }
`

export default function DashboardHeader ({ }) {


  return (
    <StyledHeader>
      <img src="/robot-shark.jpg" />
      <h1>Robot Shark</h1>
    </StyledHeader>
  )
}