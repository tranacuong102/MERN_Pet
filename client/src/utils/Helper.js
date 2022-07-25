export function isNotNullOrUndefined(data) {
    return data !== null && data !== undefined
}

export function processParams(url, params = {}, useURLSearchParams = true) {
    if (!Object.keys(params).length) {
        return url
    }
    if (useURLSearchParams) {
        return url + `?${new URLSearchParams(params)}`
    }

    Object.keys(params).forEach((key, index) => {
        const prefix = index ? '&' : '?'
        if (isNotNullOrUndefined(params[key])) {
            url += `${prefix}${key}=${params[key]}`
        }
    })
    return url
}
