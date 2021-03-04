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
    const { status, error, ...data } = await fetchFunction(...args)
    if (!status.ok) {
      setState({ ...state, error, loading: false, complete: true })
    } else {
      setState({ ...state, error: null, response: data, loading: false, complete: true})
    }
    return { status, error, ...data }
  }

  return {
    ...state,
    fetch
  }
}

export default useFetch