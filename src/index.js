// @ts-check

import "core-js/stable"

import { showDate } from "./date"
import { updateRouter } from "./router"

showDate()
updateRouter()

window.onhashchange = () => {
    updateRouter()
}

