import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../api'
import usePlaid from '../../hooks/usePlaid'


const Container = styled.div`
  background-color: #F8F8F8;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 30%;
    display: flex;
    align-items: center;
    flex-direction: column;
    > img {
      height: auto;
      margin-bottom: 60px;
    }
    > h1 {
      color: #343738;
      font-size: 3em;
      line-height: 1em;
      maring: 0;
    }
    > span {
      color: #bec5ca;
      font-size: 1.2em;
      margin-bottom: 30px;
    }
    > button {
      border: none;
      outline: none;
      background-color: #343738;
      padding: 8px 14px;
      color: #bec5ca;
      &:hover {
        cursor: pointer;
      }
    }
  }
`

export default function Home ({ }) {

  const history = useHistory()

  const createLinkToken = async () => {
    const { status, linkToken } = await api.createLinkToken()
    return status.ok ? linkToken : null
  }

  const createAccessToken = async (publicToken) => {
    await api.setAccessToken(publicToken)
  }

  const onPlaidComplete = () => {
    history.push('/dashboard')
  }

  const { ready, open } = usePlaid({
    createLinkToken,
    createAccessToken,
    onComplete: onPlaidComplete
  })

  return (
    <Container>
      <div>
        <img src="/robot-shark.jpg" />
        <h1>Robot Shark</h1>
        <span>&quot;shred your finances&quot;</span>
        <button onClick={open} disabled={!ready}>
          Connect Account
        </button>
      </div>
    </Container>
  )
}