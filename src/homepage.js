// @ts-check

import { fetchLatest100PostList, fetchPostListPage } from "./post-list"
import { buildPostListBlock } from "./post-list-block"
import loadPost from "./load-post"

import { loadLoadingPage } from "./loading-page"
import { load404Page } from "./404page"

export const loadHomepage = async (page = 0) => {
    loadLoadingPage()

    const postlist = page == 0
        ? await fetchLatest100PostList()
        : await fetchPostListPage(page)

    if (!postlist.length) {  // postlist.length == 0
        load404Page()
        return
    }

    const postListBlock = buildPostListBlock(postlist)
    loadPost("主页", postListBlock)
}

export default loadHomepage
