import chai from 'chai'

import { makeEndpoint } from '../src/server.js'

const { assert } = chai


export const test_makeEndpoint_returns_endpoint_result_as_json = async () => {

  const endpointFunc = async (request) => {
    return { json: { message: 'hello' } }
  }

  const endpoint = makeEndpoint(endpointFunc)

  const result = await endpoint({/** reqeust **/}, {
    json: (j) => j
  })

  assert.equal(result.message, 'hello')
}

export const test_makeEndpoint_returns_endpoint_error_as_json = async () => {

  const endpointFunc = async (request) => {
    return { json: { error: 'you bad' } }
  }

  const endpoint = makeEndpoint(endpointFunc)

  const result = await endpoint({/** reqeust **/}, {
    json: (j) => j
  })

  assert.equal(result.error, 'you bad')
}

export const test_makeEndpoint_returns_endpoint_exception_as_json = async () => {

  const endpointFunc = async (request) => {
    throw 'this is bad'
  }

  const endpoint = makeEndpoint(endpointFunc)

  const result = await endpoint({/** reqeust **/}, {
    json: (j) => j
  })

  assert.equal(result.error, 'this is bad')
}


