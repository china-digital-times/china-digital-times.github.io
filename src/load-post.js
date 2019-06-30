// @ts-check

import { getChineseDateString } from "./date"

/**
 * @typedef {Object} PostMeta
 * @property {string=} date
 * @property {number=} author
 * @property {number[]=} categories
 * @property {number[]=} tags
 */

/**
 * 加载文章/页面到网页上
 * @param {string} title 文章标题
 * @param {string | Node} content 文章内容
 * @param {PostMeta} meta 文章元数据
 */
export const loadPost = (title, content, meta = null) => {
    const postTitleContainer = document.getElementById("post-title")
    const postContentContainer = document.getElementById("post-content")
    const postMetaContainer = document.getElementById("post-meta")

    postTitleContainer.innerHTML = title
    document.title = `${title} – 中国数字时代镜像站`

    postMetaContainer.innerHTML = ""

    if (meta) {
        if (meta.date) {
            const dateContainer = document.createElement("div")
            dateContainer.textContent = getChineseDateString(new Date(meta.date))
            postMetaContainer.appendChild(dateContainer)
        }
    }

    if (content instanceof Node) {
        postContentContainer.appendChild(content)
    } else {
        postContentContainer.innerHTML = content
    }
}

export default loadPost
