import React from 'react'


export const useFetch = (fetchFunction) => {

  const [state, setState] = React.useState({
    loading: false,
    response: null,
    error: null,
    started: false,
    complete: false,
    pending: false
  })

  const fetch = async (...args) => {
    setState({ ...state, loading: true, started: true })
    const { error, response } = await fetchFunction(...args)
    if (error) {
      setState({ ...state, error, loading: false, complete: true })
    } else {
      setState({ ...state, error: null, response, loading: false, complete: true})
    }
    return { error, response }
  }

  return {
    ...state,
    fetch
  }
}

export default useFetch