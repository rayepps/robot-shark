// read env vars from .env file
import dotenv from 'dotenv'
dotenv.config()

import _ from 'radash'
import util from 'util'
import express from 'express'
import bodyParser from 'body-parser'
import plaid from 'plaid'
import cors from 'cors'
import * as endpoints from './endpoints.js'

const APP_PORT = process.env.APP_PORT || 8000


const makePlaid = () => {
  const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
  const PLAID_SECRET = process.env.PLAID_SECRET
  const PLAID_ENV = process.env.PLAID_ENV || 'sandbox'
  const client = new plaid.Client({
    clientID: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    env: plaid.environments[PLAID_ENV],
    options: {
      version: '2019-05-29'
    }
  })
  return {
    getItem:              asyncify(client.getItem, client),
    getAccounts:          asyncify(client.getAccounts, client),
    createLinkToken:      asyncify(client.createLinkToken, client),
    getTransactions:      asyncify(client.getTransactions, client),
    getInstitutionById:   asyncify(client.getInstitutionById, client),
    exchangePublicToken:  asyncify(client.exchangePublicToken, client),
  }
}

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


const makeEndpoint = (endpointFunc) => async (request, response) => {
  const { error, json } = await endpointFunc(request)
  if (error) {
    console.error(error)
    return response.json({ error })
  }
  return response.json(json)
}

const client = makePlaid()

app.post('/api/create_link_token',  makeEndpoint(_.partial(endpoints.createLinkToken, client)))
app.post('/api/set_access_token',   makeEndpoint(_.partial(endpoints.setAccessToken, client)))
app.get('/api/accounts',            makeEndpoint(_.partial(endpoints.getAccounts, client)))
app.get('/api/transactions',        makeEndpoint(_.partial(endpoints.getTransactions, client)))
app.get('/api/item',                makeEndpoint(_.partial(endpoints.getItem, client)))

app.listen(APP_PORT, () => {
  console.log('server listening on port ' + APP_PORT)
})
