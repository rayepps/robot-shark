import React from 'react'
import { usePlaidLink } from 'react-plaid-link'


export const usePlaid = ({ 
  createLinkToken,
  createAccessToken,
  onComplete
}) => {

  const [linkToken, setLinkToken] = React.useState('')

  const onSuccess = React.useCallback((publicToken) => {
    createAccessToken(publicToken).then(() => {
      onComplete()
    })
  }, [])

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess
  })

  const generateToken = async () => {
    const linkToken = await createLinkToken()
    setLinkToken(linkToken)
  }

  React.useEffect(() => {
    generateToken()
  }, [])

  return {
    open,
    ready
  }

}

export default usePlaid