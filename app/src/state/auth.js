import { atom, selector } from 'recoil'


export const authState = atom({
  key: 'authState',
  default: {
    linkSuccess: false,
    isItemAccess: true,
    linkToken: "", // Don't set to null or error message will show up briefly when site loads
    accessToken: null,
    itemId: null,
    isError: false,
    backend: true,
    products: ["transactions"],
  }
})

export const setFailedAccessToken = selector({
  key: 'setFailedAccessToken',
  set: ({ set, get }) => {
    set(authState, {
      ...get(authState),
      itemId: `no item_id retrieved`,
      accessToken: `no access_token retrieved`,
      isItemAccess: false
    })
  }
})

export const setAccessToken = selector({
  key: 'setAccessToken',
  set: ({ set, get }, { itemId, accessToken }) => {
    set(authState, {
      ...get(authState),
      itemId,
      accessToken,
      isItemAccess: true
    })
  }
})

export const setLinkToken = selector({
  key: 'setLinkToken',
  set: ({ set, get }, linkToken) => {
    set(authState, {
      ...get(authState),
      linkToken
    })
  }
})

export const setBackend = selector({
  key: 'setBackend',
  set: ({ set, get }, backend) => {
    set(authState, {
      ...get(authState),
      backend
    })
  }
})

export const setProducts = selector({
  key: 'setProducts',
  set: ({ set, get }, products) => {
    set(authState, {
      ...get(authState),
      products
    })
  }
})

export default {
  state: authState,
  setFailedAccessToken,
  setAccessToken,
  setLinkToken,
  setBackend,
  setProducts
}