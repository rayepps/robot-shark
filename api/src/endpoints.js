import moment from 'moment'


const CLIENT_NAME = 'Robot Shark'
const PLAID_PRODUCTS = ['transactions']
const PLAID_COUNTRY_CODES = ['US']

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null


export const createLinkToken = async (client, request) => {
  const { error, result } = await client.createLinkToken({
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user-id'
    },
    client_name: CLIENT_NAME,
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en'
  })
  if (error) return { error }
  return { json: result }
}

export const setAccessToken = async (client, request) => {
  PUBLIC_TOKEN = request.body.public_token
  const { error, result } = await client.exchangePublicToken(PUBLIC_TOKEN)
  if (error) return { error }
  ACCESS_TOKEN = result.access_token
  ITEM_ID = result.item_id
  return {
    json: {
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null
    }
  }
}

export const getAccounts = async (client, request) => {
  const { error, result } = await client.getAccounts(ACCESS_TOKEN)
  if (error) return { error }
  return { json: result }
}

export const getTransactions = async (client, request) => {
  // Pull transactions for the Item for the last 30 days
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')
  const { error, result } = await client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0
  })
  if (error) return { error }
  return { json: result }
}

export const getItem = async (client, request) => {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  const { error: itemError, result: item } = await client.getItem(ACCESS_TOKEN)
  if (itemError) return { error: itemError }
  // Also pull information about the institution
  const { error: instError, result: inst } = await client.getInstitutionById(item.item.institution_id)
  if (instError) return { error: instError }
  return {
    json: {
      item: item.item,
      institution: inst.institution
    }
  }
}