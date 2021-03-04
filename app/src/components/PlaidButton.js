import React, { useEffect, useContext, useCallback } from 'react'
import Recoil from 'recoil'
import { usePlaidLink } from 'react-plaid-link'
import api from '../api'
import authState from '../state/auth'


export default function PlaidButton ({
  children
}) {
  
  const { linkToken } = Recoil.useRecoilValue(authState.state)
  const setAccessTokenFailed = Recoil.useSetRecoilState(authState.setFailedAccessToken)
  const setAccessToken = Recoil.useSetRecoilState(authState.setAccessToken)

  const onSuccess = useCallback((publicToken) => {

    // send public_token to server
    const setToken = async () => {
      const { status, itemId, accessToken } = await api.setAccessToken(publicToken)
      if (!status.ok) {
        setAccessTokenFailed()
        return
      }
      setAccessToken({
        itemId,
        accessToken
      })
    }
    setToken()
    // dispatch({ type: "SET_STATE", state: { linkSuccess: true } })
    window.history.pushState("", "", "/")
  }, [])

  const isOauth = window.location.href.includes("?oauth_state_id=")

  console.log('linkToken: ', linkToken)

  const { open, ready } = usePlaidLink({
    token: linkToken,
    receivedRedirectUri: isOauth ? window.location.href : undefined,
    onSuccess
  })

  useEffect(() => {
    if (isOauth && ready) {
      open()
    }
  }, [ready, open, isOauth])

  return (
    <button onClick={() => open()} disabled={!ready}>
      {children}
    </button>
  )
}

