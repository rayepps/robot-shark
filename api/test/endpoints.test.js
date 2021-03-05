import chai from 'chai'

import * as endpoints from '../src/endpoints.js'

const { assert } = chai


export const test_createLinkToken_returns_client_result = async () => {
  const plaidClient = {
    createLinkToken: async (config) => {
      return [null, 'link-token']
    }
  }
  const result = await endpoints.createLinkToken(plaidClient, {})
  assert.equal(result.json, 'link-token')
}

export const test_createLinkToken_returns_client_error = async () => {
  const plaidClient = {
    createLinkToken: async (config) => {
      return ['broken', null]
    }
  }
  const result = await endpoints.createLinkToken(plaidClient, {})
  assert.equal(result.error, 'broken')
}

export const test_setAccessToken_returns_client_result = async () => {
  const plaidClient = {
    exchangePublicToken: async (publicToken) => {
      return [null, {
        access_token: 'mock-access-token',
        item_id: 'mock-item-id'
      }]
    }
  }
  const result = await endpoints.setAccessToken(plaidClient, {
    body: { public_token: 'mock-pub-token' }
  })
  assert.equal(result.json.access_token, 'mock-access-token')
  assert.equal(result.json.item_id, 'mock-item-id')
}

export const test_setAccessToken_returns_client_error = async () => {
  const plaidClient = {
    exchangePublicToken: async (publicToken) => {
      return ['broken', null]
    }
  }
  const result = await endpoints.setAccessToken(plaidClient, {
    body: { public_token: 'mock-pub-token' }
  })
  assert.equal(result.error, 'broken')
}

export const test_getAccounts_returns_client_result = async () => {
  const plaidClient = {
    getAccounts: async (accessToken) => {
      return [null, 'mock-accounts']
    }
  }
  const result = await endpoints.getAccounts(plaidClient, {})
  assert.equal(result.json, 'mock-accounts')
}

export const test_getAccounts_returns_client_error = async () => {
  const plaidClient = {
    getAccounts: async (accessToken) => {
      return ['broken', null]
    }
  }
  const result = await endpoints.getAccounts(plaidClient, {})
  assert.equal(result.error, 'broken')
}