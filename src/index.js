// @ts-check

import "core-js/stable"

import { showDate } from "./date"
import { showSearchBox } from "./search-box"
import { updateRouter } from "./router"

showDate()
showSearchBox()
updateRouter()

window.onhashchange = () => {
    updateRouter()
}

