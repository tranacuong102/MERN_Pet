import { atom } from 'recoil'

const KEY = 'authState'

const authState = atom({
    key: KEY,
    default: null,
})

export { authState }
