import React, { useEffect } from 'react'
import Recoil from 'recoil'
import styled from 'styled-components'
import PlaidButton from '../../components/PlaidButton'
import authState from '../../state/auth'
import api from '../../api'


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

  const setLinkToken = Recoil.useSetRecoilState(authState.setLinkToken)

  const generateToken = async () => {
    const { status, linkToken } = await api.createLinkToken()
    if (!status.ok) {
      setLinkToken(null)
      return
    }
    setLinkToken(linkToken)
    localStorage.setItem("link_token", linkToken) //to use later for Oauth
  }

  useEffect(() => {
    // do not generate a new token for OAuth redirect instead
    // setLinkToken from localStorage
    if (window.location.href.includes("?oauth_state_id=")) {
      const linkToken = localStorage.getItem("link_token")
      setLinkToken(linkToken)
      return
    }
    generateToken()
  }, [])

  return (
    <Container>
      <div>
        <img src="/robot-shark.jpg" />
        <h1>Robot Shark</h1>
        <span>&quot;shred your finances&quot;</span>
        <PlaidButton>Connect Account</PlaidButton>
      </div>
    </Container>
  )
}