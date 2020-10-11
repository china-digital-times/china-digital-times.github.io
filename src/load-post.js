// @ts-check

import { getChineseDateString } from "./date"
import { ROUTER_PREFIX } from "./router"

/**
 * @typedef {Object} PostMeta
 * @property {number=} id
 * @property {string=} link
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
            const dateContainer0 = document.createElement("p")
            const dateContainer1 = document.createElement("span")
            dateContainer1.classList.add("updated")
            dateContainer1.textContent = getChineseDateString(new Date(meta.date))
            dateContainer0.appendChild(dateContainer1)
            postMetaContainer.appendChild(dateContainer0)
        }

        if (meta.link || meta.id) {
            const originalLinkContainer = document.createElement("div")
            originalLinkContainer.id = "syndication_permalink"
            const a = document.createElement("a")
            a.textContent = "原始链接"
            a.href = meta.link || `https://chinadigitaltimes.net/chinese/?p=${meta.id}`
            originalLinkContainer.appendChild(a)
            postMetaContainer.appendChild(originalLinkContainer)
        }
    }

    if (content instanceof Node) {
        postContentContainer.innerHTML = ""
        postContentContainer.appendChild(content)
    } else {
        postContentContainer.innerHTML = content
    }

    // 修改站内链接跳转
    postContentContainer.querySelectorAll("a").forEach((a) => {
        if (a.href.match(/^https?:\/\/chinadigitaltimes.net\/chinese\/\d{4}\/\d{2}\//)) {
            a.href = `${ROUTER_PREFIX}/link/` + a.href
        }
    })

    // 自动替换图片地址为在Github备份的图片
    const imgReg = /^(?:https?:\/\/|)chinadigitaltimes\.net\/chinese(.*)\/files\//
    const newUCDN = "https://cdn.statically.io/gh/china-digital-times/files/master/"
    const newUGithub = "https://raw.githubusercontent.com/china-digital-times/files/master/"

    postContentContainer.querySelectorAll("img").forEach((imgE) => {
        const oldSrc = imgE.src
        const newSrcCDN = oldSrc.replace(imgReg, newUCDN)
        const newSrcGithub = oldSrc.replace(imgReg, newUGithub)
        imgE.src = newSrcGithub
        imgE.srcset = `${newSrcCDN}, ${newSrcGithub}, ${oldSrc}`
    })
}

export default loadPost
