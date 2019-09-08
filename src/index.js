// @ts-check

import "core-js/stable"

import { showSearchBox } from "./search-box"
import { updateRouter } from "./router"

showSearchBox()
updateRouter()

window.onhashchange = () => {
    updateRouter()
}

