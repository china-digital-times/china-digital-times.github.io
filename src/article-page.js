// @ts-check

import { fetchPostData } from "./fetch-data"
import loadPost from "./load-post"

import { loadLoadingPage } from "./loading-page"
import { load404Page } from "./404page"

/**
 * @param {number} id Post ID
 */
export const loadArticlePage = async (id) => {
    loadLoadingPage()  // 异步加载时显示加载中页面
    const postdata = await fetchPostData(id)
    if (postdata.title && postdata.content) {
        loadPost(postdata.title, postdata.content, { date: postdata.date })
    } else {
        load404Page()
    }
}

export default loadArticlePage
