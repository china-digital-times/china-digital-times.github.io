// @ts-check

import { loadHomepage, INDEX_PAGE_REG } from "./homepage"
import { load404Page } from "./404page"
import { loadArticlePageByID, loadArticlePageByLink } from "./article-page"
import { loadSearchPage } from "./search-page"

export const ROUTER_PREFIX = "?"

export const updateRouter = (url = location.href) => {
    const u = new URL(url)
    const route = u.search.slice(1)

    window.scrollTo(0, 0)

    // upgrade from legacy router
    const p = u.hash.match(/^#\/(.*)$/)
    if (p) {
        location.href = `${ROUTER_PREFIX}/${p[1]}`
        return
    }

    if (!route || !route.startsWith("/")) {
        location.href = `${ROUTER_PREFIX}/`
        return
    } else if (route == "/") {  // homepage
        const m = u.hash.match(INDEX_PAGE_REG)
        if (m) {
            loadHomepage(+m[1])
        } else {
            loadHomepage()
        }
        return
    } else if (route.startsWith("/id/") || route.startsWith("/p/")) {
        const m = route.match(/^\/(?:id|p)\/(\d+)\/?$/)
        if (m) {
            loadArticlePageByID(+m[1])
            return
        }
    } else if (route.startsWith("/link/")) {
        const m = route.match(/^\/link\/(?:https?:\/\/chinadigitaltimes.net)?\/*(.+)$/)
        if (m) {
            const linkURL = new URL(`https://chinadigitaltimes.net/${m[1]}`)
            let link = linkURL.origin + linkURL.pathname
            if (!link.endsWith("/")) {
                link += "/"
            }

            if (route != `/link/${link}`) {
                location.href = `${ROUTER_PREFIX}/link/${link}`
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
    } else if (route.startsWith("/search/")) {
        const m = route.match(/^\/search\/(.+)$/)
        if (m) {
            const q = m[1]
            loadSearchPage(q)
            return
        }
    }

    load404Page()
}
