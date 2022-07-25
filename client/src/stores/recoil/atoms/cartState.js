import { atom } from 'recoil'

const KEY = 'cartState'

const cartState = atom({
    key: KEY,
    default: null,
})

export { cartState }
