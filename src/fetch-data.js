// @ts-check

import fetchGithubFile from "./fetch-github-file"

/**
 * @param {string} repo 
 * @param {string} filePath 
 * @param {boolean=} noCache
 */
const fetchDataJson = async (repo, filePath, noCache = false) => {
    try {
        const r = await fetchGithubFile(repo, filePath, noCache)
        return await r.json()
    } catch {
        return {}
    }
}

/**
 * @param {string} name 
 * @returns {Promise<{ [x: string]: string | number; }>}
 */
export const fetchIndexData = (name) => {
    return fetchDataJson("index", `${name}.json`, true)
}

/**
 * @param {number} id Post ID
 */
export const fetchPostData = (id) => {
    return fetchDataJson("data", `${id}.json`, false)
}
