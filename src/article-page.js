// @ts-check

import { fetchPostData, fetchIndexData } from "./fetch-data"
import { ROUTER_PREFIX } from "./router"
import loadPost from "./load-post"

import { loadLoadingPage } from "./loading-page"
import { load404Page } from "./404page"

/**
 * @param {number} id Post ID
 */
export const loadArticlePageByID = async (id) => {
    loadLoadingPage()  // 异步加载时显示加载中页面
    const postdata = await fetchPostData(id)
    if (postdata.title && postdata.content) {
        loadPost(postdata.title, postdata.content, { date: postdata.date, id, })
    } else {
        load404Page()
    }
}

/**
 * @param {string} link 
 */
export const loadArticlePageByLink = async (link) => {
    loadLoadingPage()
    const link2id = await fetchIndexData("link2id")
    console.log(link)
    const id = link2id[link]
    if (id) {
        // loadArticlePageByID(+id)
        location.href = `${ROUTER_PREFIX}/id/${id}`
    } else {
        load404Page()
    }
}
