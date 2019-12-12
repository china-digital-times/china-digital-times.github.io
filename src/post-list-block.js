// @ts-check

import { buildPostLink } from "./post-list"

/** @typedef {import("./post-list").PostListItem} PostListItem */

/**
 * @param {PostListItem} post 
 */
export const buildPostAnchor = (post) => {
    const a = document.createElement("a")
    a.href = buildPostLink(post)
    a.innerHTML = post.title
    return a
}

/**
 * @param {string} blockTitle 
 */
const buildH3 = (blockTitle) => {
    const h3 = document.createElement("h3")
    const h3a = document.createElement("a")
    h3a.textContent = blockTitle
    h3.appendChild(h3a)
    return h3
}

/**
 * @param {PostListItem} post 
 */
const buildLi = (post) => {
    const li = document.createElement("li")
    const a = buildPostAnchor(post)
    li.appendChild(a)
    return li
}

/**
 * @param {PostListItem[]} postList 
 */
const buildListContainer = (postList) => {
    const listContainer = document.createElement("div")
    listContainer.classList.add("home_cat_list")

    const ul = document.createElement("ul")
    const lis = postList.map(buildLi)
    ul.append(...lis)
    listContainer.appendChild(ul)

    return listContainer
}

/**
 * @param {PostListItem[]} postList 
 */
export const buildPostListBlock = (postList, blockTitle = "最新文章", noPostText = "没有文章") => {
    const container = document.createElement("div")
    container.classList.add("home_post_list_block")

    if (blockTitle && typeof blockTitle == "string") {
        const h3 = buildH3(blockTitle)
        container.appendChild(h3)
    }

    if (!Array.isArray(postList)) {
        postList = []
    }

    if (postList.length > 0) {
        const listContainer = buildListContainer(postList)
        container.appendChild(listContainer)
    } else if (noPostText && typeof noPostText == "string") {
        container.appendChild(document.createTextNode(noPostText))
    }

    return container
}

export default buildPostListBlock
