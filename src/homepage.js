// @ts-check

import { fetchLatest100PostList } from "./post-list"
import { buildPostListBlock } from "./post-list-block"
import loadPost from "./load-post"

export const loadHomepage = async () => {
    const postlist = await fetchLatest100PostList()
    const postListBlock = buildPostListBlock(postlist)
    loadPost("主页", postListBlock)
}

export default loadHomepage
