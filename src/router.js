// @ts-check

import { loadHomepage } from "./homepage"
import { load404Page } from "./404page"
import { loadArticlePageByID, loadArticlePageByLink } from "./article-page"

export const updateRouter = (url = location.href) => {
    const u = new URL(url)
    const hash = u.hash

    if (!hash || !hash.startsWith("#/")) {
        location.href = "#/"
        return
    } else if (hash == "#/") {  // homepage
        loadHomepage()
        return
    } else if (hash.startsWith("#/id/")) {
        const m = hash.match(/^#\/id\/(\d+)\/?$/)
        if (m) {
            loadArticlePageByID(+m[1])
            return
        }
    } else if (hash.startsWith("#/link/")) {
        const m = hash.match(/^#\/link\/(?:https?:\/\/chinadigitaltimes.net)?\/*(.+)$/)
        if (m) {
            const linkURL = new URL(`https://chinadigitaltimes.net/${m[1]}`)
            let link = linkURL.origin + linkURL.pathname
            if (!link.endsWith("/")) {
                link += "/"
            }

            if (hash != `#/link/${link}`) {
                location.href = `#/link/${link}`
                return
            }

            let linkDecoded
            try {
                linkDecoded = decodeURI(link)
            } catch (e) {
                linkDecoded = link
            }

            loadArticlePageByLink(linkDecoded)
            return
        }
    }

    load404Page()
}
