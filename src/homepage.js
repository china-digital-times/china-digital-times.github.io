// @ts-check

import { fetchLatest100PostList, fetchPostListPage } from "./post-list"
import { buildPostListBlock } from "./post-list-block"
import loadPost from "./load-post"

import { loadLoadingPage } from "./loading-page"
import { load404Page } from "./404page"

const itemsPerPage = 100

/**
 * @param {number | null} prevPage 
 * @param {number | null} nextPage 
 */
const buildPaginator = (prevPage, nextPage) => {
    const paginator = document.createElement("div")

    const addBtn = (name, p) => {
        const a = document.createElement("a")
        a.style.fontWeight = "700"
        a.style.fontSize = "18px"
        a.style.marginRight = "2em"
        a.href = `#/?page=${p}`
        a.text = name
        paginator.appendChild(a)
    }

    if (prevPage) {
        addBtn("上一页", prevPage)
    }

    if (nextPage) {
        addBtn("下一页", nextPage)
    }

    return paginator
}

export const loadHomepage = async (page = 1) => {
    loadLoadingPage()

    if (!page || page <= 1) {
        page = 1
    }

    const postlist = page == 1
        ? await fetchLatest100PostList()
        : await fetchPostListPage(page, itemsPerPage)

    if (!postlist.length) {  // postlist.length == 0
        load404Page()
        return
    }

    const postListBlock = buildPostListBlock(postlist)
    const paginator = buildPaginator(
        page == 1 ? null : page - 1,
        page + 1,
    )
    postListBlock.appendChild(paginator)

    loadPost("主页", postListBlock)
}

export default loadHomepage
