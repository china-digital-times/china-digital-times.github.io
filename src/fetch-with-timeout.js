// @ts-check

import "whatwg-fetch"

/**
 * fetch files with timeout & catch errors
 * @param {RequestInfo} input 
 * @param {RequestInit=} init 
 * @param {number} timeout (ms)
 * @returns {Promise<Response | null>}
 */
export const fetchWithTimeout = (input, init, timeout = 2000) => {
    return Promise.race([
        fetch(input, init).then((r) => {
            if (r.ok) {
                return r
            } else {
                return null
            }
        }, () => {
            return null
        }),
        new Promise((resolve) => {
            setTimeout(() => resolve(null), timeout)
        })
    ])
}

export default fetchWithTimeout
