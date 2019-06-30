// @ts-check

import { loadHomepage } from "./homepage"
import { load404Page } from "./404page"
import { loadArticlePage } from "./article-page"

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
            loadArticlePage(+m[1])
            return
        }
    } else if (hash.startsWith("#/link/")) {
        // TODO
        return
    }

    load404Page()
}
