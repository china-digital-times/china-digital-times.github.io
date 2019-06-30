// @ts-check

import { fetchIndexData } from "./fetch-data"

/**
 * @typedef {Object} PostListItem
 * @property {string} id
 * @property {string} title
 */

/**
 * @returns {Promise<PostListItem[]>}
 */
export const fetchLatest100PostList = async (reverse = true) => {
    const data = await fetchIndexData("latest100id2title")

    /** [id, title] */
    const list = Object.entries(data)

    const postlist = list.map((post) => {
        return {
            id: post[0],
            title: "" + post[1],
        }
    })

    if (reverse) {
        postlist.reverse()
    }

    return postlist
}

/**
 * @param {PostListItem} post 
 */
export const buildPostLink = (post) => {
    return `#/id/${post.id}`
}

