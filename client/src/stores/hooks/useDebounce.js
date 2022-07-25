import { useState, useEffect } from 'react'

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        if (value.includes('  ')) {
            const fixValue = value.split(' ')
            const configValue = fixValue.filter((str) => {
                return str !== ''
            })
            const result = configValue.join(' ')
            const handler = setTimeout(() => {
                setDebouncedValue(result)
            }, delay)
            return () => clearTimeout(handler)
        } else {
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)
            return () => clearTimeout(handler)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return debouncedValue
}

export default useDebounce
