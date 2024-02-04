export const createQueryString = (name, value) => {
    const params = new URLSearchParams()
    params.set(name, value)
    return params.toString()
}