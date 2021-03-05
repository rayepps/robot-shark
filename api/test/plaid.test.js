import chai from 'chai'
import plaid from 'plaid'


import { makePlaid } from '../src/plaid.js'

const { assert } = chai


export const test_makePlaid_does_not_fail = () => {
  const client = new plaid.Client({
    clientID: 'anything',
    secret: 'shhhhh',
    env: plaid.environments['sandbox']
  })
  const p = makePlaid(client)
  assert.isFunction(p.getItem)
}
