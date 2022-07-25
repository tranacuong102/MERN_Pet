export function useLocalStorage(
    key = '',
    defaultValue,
    shouldStringify = true
) {
    let value = defaultValue

    if (typeof window !== 'undefined') {
        value = localStorage?.getItem(key)
            ? shouldStringify
                ? JSON.parse(localStorage?.getItem(key))
                : localStorage?.getItem(key)
            : defaultValue
    }

    const setValue = (newValue) => {
        if (localStorage) {
            if (newValue || typeof newValue === 'boolean') {
                if (shouldStringify) {
                    localStorage.setItem(key, JSON.stringify(newValue))
                } else {
                    localStorage.setItem(key, newValue)
                }
            } else {
                localStorage.removeItem(key)
            }
        }
        return true
    }
    return [value, setValue]
}
