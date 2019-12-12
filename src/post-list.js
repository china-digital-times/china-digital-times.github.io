// @ts-check

import { fetchIndexData } from "./fetch-data"

/**
 * @typedef {Object} PostListItem
 * @property {string} id
 * @property {string} title
 */

/**
 * @param {string} indexName 
 * @returns {Promise<PostListItem[]>}
 */
const fetchPostList = async (indexName, reverse = true) => {
    const data = await fetchIndexData(indexName)

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

export const fetchLatest100PostList = async (reverse = true) => {
    return fetchPostList("latest100id2title", reverse)
}

/** @type {PostListItem[]} */
let allPostListCache

export const fetchAllPostList = async (reverse = true) => {
    if (!allPostListCache) {
        allPostListCache = await fetchPostList("id2title", reverse)
    }
    return allPostListCache
}

/**
 * @param {number} page 
 * @param {number=} itemsPerPage 
 * @param {boolean=} reverse 
 */
export const fetchPostListPage = async (page, itemsPerPage = 100, reverse = true) => {
    const postList = await fetchAllPostList(reverse)
    return postListPagination(postList, page, itemsPerPage)
}

/**
 * @param {PostListItem[]} postList 
 * @param {number} page 
 * @param {number=} itemsPerPage 
 */
export const postListPagination = (postList, page, itemsPerPage = 100) => {
    return postList.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
}

/**
 * @param {PostListItem} post 
 */
export const buildPostLink = (post) => {
    return `#/id/${post.id}`
}

