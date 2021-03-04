
const ROBOT_SHARK_API_URL = 'http://localhost:8000'

const success = (data) => ({
  status: { ok: true },
  ...data
})

const fail = (data = {}) => ({
  status: { ok: false },
  ...data
})

export const setAccessToken = async (publicToken) => {
  const response = await fetch(`${ROBOT_SHARK_API_URL}/api/set_access_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: `public_token=${publicToken}`
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    itemId: data.item_id,
    accessToken: data.accessToken
  })
}

export const getInfo = async () => {
  const response = await fetch(`${ROBOT_SHARK_API_URL}/api/info`, { 
    method: "POST" 
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    products: data.products || []
  })
}

export const createLinkToken = async () => {
  const response = await fetch(`${ROBOT_SHARK_API_URL}/api/create_link_token`, { 
    method: "POST" 
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    linkToken: data.link_token
  })
}

export const createLinkTokenForPayment = async () => {
  const response = await fetch(`${ROBOT_SHARK_API_URL}/api/create_link_token_for_payment`, { 
    method: "POST" 
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    linkToken: data.link_token
  })
}

export const listAccounts = async () => {
  const response = await fetch(`${ROBOT_SHARK_API_URL}/api/accounts`, { 
    method: "GET"
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    accounts: data.accounts || [],
    item: data.item
  })
}

export const getInstitution = async () => {
  const response = await fetch(`${ROBOT_SHARK_API_URL}/api/item`, { 
    method: "GET"
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    institution: data.institution
  })
}

export const listTransactions = async () => {
  const response = await fetch(`${ROBOT_SHARK_API_URL}/api/transactions`, { 
    method: "GET"
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    transactions: data.transactions || []
  })
}

export default {
  setAccessToken,
  getInfo,
  createLinkToken,
  createLinkTokenForPayment,
  listAccounts,
  getInstitution,
  listTransactions
}