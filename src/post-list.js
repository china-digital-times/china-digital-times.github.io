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
 * @param {boolean=} prefetch 
 */
export const fetchPostListPage = async (page, itemsPerPage = 100, reverse = true, prefetch = true) => {
    if (!allPostListCache && page == 1) {
        const postList = await fetchLatest100PostList()
        if (prefetch) {
            fetchAllPostList()  // prefetch
        }
        return postList
    }

    const postList = await fetchAllPostList(reverse)
    return postListPagination(postList, page, itemsPerPage)
}

/**
 * @param {PostListItem[]} postList 
 * @param {number} page 
 * @param {number=} itemsPerPage 
 */
export const postListPagination = (postList, page, itemsPerPage = 100) => {
    page--  // starts from 1
    return postList.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
}

/**
 * @param {PostListItem} post 
 */
export const buildPostLink = (post) => {
    return `#/id/${post.id}`
}

