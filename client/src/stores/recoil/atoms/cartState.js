import { atom } from 'recoil'

const KEY = 'cartState'

const cartState = atom({
    key: KEY,
    default: [],
})

export { cartState }
