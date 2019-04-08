export function setStore(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
}
export function getStore(key) {
    return JSON.parse(localStorage.getItem(key))
}
export function removeStore(key) {
    localStorage.removeItem(key)
}