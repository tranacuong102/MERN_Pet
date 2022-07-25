import { atom } from 'recoil'

const KEY = 'accessTokenState'

const accessTokenState = atom({
    key: KEY,
    default: null,
})

export { accessTokenState }
