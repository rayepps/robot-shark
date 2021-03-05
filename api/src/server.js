// read env vars from .env file
require('dotenv').config()

const util = require('util')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const plaid = require('plaid')
const cors = require('cors')

const APP_PORT = process.env.APP_PORT || 8000
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox'
const CLIENT_NAME = process.env.CLIENT_NAME || 'Robot Shark'

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = ['transactions']

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
  ',',
)

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const client = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: plaid.environments[PLAID_ENV],
  options: {
    version: '2019-05-29'
  }
})

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())



const asyncify = (func, context = null) => {
  const promisified = util.promisify(context ? func.bind(context) : func)
  return (...args) => new Promise((resolve) => {
    promisified(...args).then(result => {
      resolve({ error: null, result })
    }).catch(error => {
      resolve({ error, result: null })
    })
  })
}


// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
app.post('/api/create_link_token', async (request, response) => {

  const createLinkToken = asyncify(client.createLinkToken, client)  

  const { error, result } = await createLinkToken({
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user-id'
    },
    client_name: CLIENT_NAME,
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en'
  })

  if (error != null) {
    console.log(error)
    return response.json({
      error: error
    })
  }
  response.json(result)
})

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/api/set_access_token', async (request, response) => {
  
  PUBLIC_TOKEN = request.body.public_token

  const exchangePublicToken = asyncify(client.exchangePublicToken, client)  

  const { error, result } = await exchangePublicToken(PUBLIC_TOKEN)

  if (error) {
    console.log(error)
    return response.json({ error })
  }

  ACCESS_TOKEN = result.access_token
  ITEM_ID = result.item_id

  response.json({
    access_token: ACCESS_TOKEN,
    item_id: ITEM_ID,
    error: null
  })

})

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
app.get('/api/accounts', async (request, response) => {
  const getAccounts = asyncify(client.getAccounts, client)  
  const { error, result } = await getAccounts(ACCESS_TOKEN)
  if (error) {
    console.log(error)
    return response.json({ error })
  }
  response.json(result)
})

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get('/api/transactions', async (request, response) => {
  // Pull transactions for the Item for the last 30 days
  const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')
  const getTransactions = asyncify(client.getTransactions, client)  
  const { error, result } = await getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0
  })
  if (error) {
    console.log(error)
    return response.json({ error })
  }
  response.json(result)
})

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
app.get('/api/item', async (request, response) => {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  const getItem = asyncify(client.getItem, client)  
  const { error: itemError, result: item } = await getItem(ACCESS_TOKEN)
  if (itemError) {
    console.log(itemError)
    return response.json({ error: itemError })
  }
  // Also pull information about the institution
  const getInstitutionById = asyncify(client.getInstitutionById, client)
  const { error: instError, result: inst } = await getInstitutionById(item.item.institution_id)
  if (instError) {
    console.log(instError)
    return response.json({ error: instError })
  }
  response.json({
    item: item.item,
    institution: inst.institution
  })
})

app.listen(APP_PORT, () => {
  console.log('server listening on port ' + APP_PORT)
})
