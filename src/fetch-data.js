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
 * @typedef {Object} PostData
 * @property {number} id
 * @property {string} link
 * @property {string} date
 * @property {string} modified
 * @property {string} title
 * @property {string} content
 * @property {number} author
 * @property {number[]} categories
 * @property {number[]} tags
 */

/**
 * @param {number} id Post ID
 * @returns {Promise<PostData>}
 */
export const fetchPostData = (id) => {
    return fetchDataJson("data", `${id}.json`, false)
}
