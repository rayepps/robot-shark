import _ from 'radash'
import plaid from 'plaid'
import util from 'util'


const PLAID_ENV = process.env.PLAID_ENV || 'sandbox'
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID

export const makePlaid = (client) => {
  // Here were converting all the plaid client functions we want to use from
  // callback style to promise based so we can use await and also from throw
  // able functions to golang-like funcs that return an array where the first
  // item is an error (or null) and the ...rest are your function return values.
  return {
    getItem:              _.tryit(util.promisify(client.getItem.bind(client))),
    getAccounts:          _.tryit(util.promisify(client.getAccounts.bind(client))),
    createLinkToken:      _.tryit(util.promisify(client.createLinkToken.bind(client))),
    getTransactions:      _.tryit(util.promisify(client.getTransactions.bind(client))),
    getInstitutionById:   _.tryit(util.promisify(client.getInstitutionById.bind(client))),
    exchangePublicToken:  _.tryit(util.promisify(client.exchangePublicToken.bind(client)))
  }
}

export default () => {
  const client = new plaid.Client({
    clientID: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    env: plaid.environments[PLAID_ENV],
    options: {
      version: '2019-05-29'
    }
  })
  return makePlaid(client)
}