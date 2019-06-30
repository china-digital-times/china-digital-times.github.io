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

const buildH3 = () => {
    const h3 = document.createElement("h3")
    const h3a = document.createElement("a")
    h3a.textContent = "最近100篇文章"
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
export const buildPostListBlock = (postList) => {
    const container = document.createElement("div")
    container.classList.add("home_post_list_block")

    const h3 = buildH3()
    const listContainer = buildListContainer(postList)

    container.append(h3, listContainer)
    return container
}

export default buildPostListBlock
