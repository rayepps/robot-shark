
const success = (data) => ({
  status: { ok: true },
  ...data
})

const fail = (data = {}) => ({
  status: { ok: false },
  ...data
})

export const setAccessToken = async (publicToken) => {
  const response = await fetch("/api/set_access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencodedcharset=UTF-8",
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
  const response = await fetch("/api/info", { 
    method: "POST" 
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    products: data.products || []
  })
}

export const createLinkToken = async () => {
  const response = await fetch("/api/create_link_token", { 
    method: "POST" 
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    linkToken: data.link_token
  })
}

export const createLinkTokenForPayment = async () => {
  const response = await fetch("/api/create_link_token_for_payment", { 
    method: "POST" 
  })
  if (!response.ok) return fail()
  const data = await response.json()
  return success({
    linkToken: data.link_token
  })
}


export default {
  setAccessToken,
  getInfo,
  createLinkToken,
  createLinkTokenForPayment
}