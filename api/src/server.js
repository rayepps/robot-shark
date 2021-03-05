import _ from 'radash'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as endpoints from './endpoints.js'
import makePlaid from './plaid.js'


const APP_PORT = process.env.APP_PORT || 8000


export const makeEndpoint = (endpointFunc) => async (request, response) => {
  const [exc, result] = await _.tryit(endpointFunc)(request)
  if (exc) {
    console.error(exc)
    console.trace('Error thrown in endpoint:')
    return response.json({ error: exc })
  }
  const { error, json } = result
  if (error) {
    console.error(error)
    return response.json({ error })
  }
  return response.json(json)
}

export const run = () => {

  // Create server
  const app = express()

  // Setup middleware
  app.use(cors())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())

  // Create dependencies/services
  const client = makePlaid()

  // Wire up functions to endpoints
  app.post('/api/create_link_token',  makeEndpoint(_.partial(endpoints.createLinkToken, client)))
  app.post('/api/set_access_token',   makeEndpoint(_.partial(endpoints.setAccessToken, client)))
  app.get('/api/accounts',            makeEndpoint(_.partial(endpoints.getAccounts, client)))
  app.get('/api/transactions',        makeEndpoint(_.partial(endpoints.getTransactions, client)))
  app.get('/api/item',                makeEndpoint(_.partial(endpoints.getItem, client)))

  // ship it
  app.listen(APP_PORT, () => {
    console.log(`server listening on port ${APP_PORT}`)
  })

}

export default {
  run
}
