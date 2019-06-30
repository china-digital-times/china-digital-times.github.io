// @ts-check

import fetchWithTimeout from "./fetch-with-timeout"

/**
 * fetch files on Github with fallback urls
 * @param {string} repo 
 * @param {string} filePath 
 * @param {boolean=} noCache
 * @param {number=} timeout (ms)
 */
export const fetchGithubFile = async (repo, filePath, noCache = false, timeout = 2000) => {

    const urls = [
        `https://raw.githubusercontent.com/china-digital-times/${repo}/master/${filePath}`,
        `https://cdn.statically.io/gh/china-digital-times/${repo}/master/${filePath}${noCache ? "?env=dev" : ""}`,
        `https://cdn.jsdelivr.net/gh/china-digital-times/${repo}/${filePath}`,
        `https://china-digital-times.github.io/${repo}/${filePath}`
    ]

    /** @type {RequestInit} */
    const noCacheReqInit = noCache
        ? {
            cache: "no-cache"
        }
        : {}

    for (const url of urls) {
        const r = await fetchWithTimeout(url, noCacheReqInit, timeout)
        if (r) {
            return r
        }
    }

    throw new TypeError("NetworkError when attempting to fetch resource.")
}

export default fetchGithubFile
