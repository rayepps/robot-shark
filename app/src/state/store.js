import { atom, selector } from 'recoil'



export const storeState = atom({
  key: 'storeState',
  default: {
    username: '',
    email: '',
    id: '',
    role: '',
    thumbnailUrl: ''
  }
})

export const setStoreState = selector({
  key: 'setStoreState',
  set: ({ set }, store) => {
    set(storeState, {
      
    })
  }
})
