// @ts-check

import { getSearchResultPostList } from "./search"
import { buildPostListBlock } from "./post-list-block"
import loadPost from "./load-post"

import { loadLoadingPage } from "./loading-page"

/**
 * @param {string} q 搜索关键词
 */
export const loadSearchPage = async (q) => {
    loadLoadingPage()
    const postlist = await getSearchResultPostList(q)
    const postListBlock = buildPostListBlock(postlist, "", "无结果")
    loadPost("搜索结果 (全文搜索)", postListBlock)
}

export default loadSearchPage
