// @ts-check

import { fetchIndexData } from "./fetch-data"

/**
 * @param {string} q 搜索关键词
 * @returns {Promise<number[]>} 包含结果的 Post ID 的数组 
 */
export const getSearchResult = async (q) => {
    const _q = q.replace(/\s+/g, "+")
    const url = `https://api.github.com/search/code?q=${_q}+in:file+repo:china-digital-times/data`

    try {
        const r = await fetch(url, {
            cache: "no-cache"
        })

        /** @type {{ items: { name: string; [x: string]: any; }[]; [x: string]: any; }} */
        const json = await r.json()

        return json.items.map((item) => {
            const regex = /^(\d+)\.json$/
            if (item.name.match(regex)) {
                return +item.name.match(regex)[1]
            }
        })
    } catch {
        return []
    }
}

/**
 * @param {string} q 搜索关键词
 * @returns {Promise<import("./post-list").PostListItem[]>}
 */
export const getSearchResultPostList = async (q) => {

    const [ids, id2link] = await Promise.all([
        getSearchResult(q),
        fetchIndexData("id2link"),
    ])

    const postlist = ids.map((id) => {
        return {
            id: "" + id,
            title: ("" + id2link[id]) || "",
        }
    })

    return postlist
}
