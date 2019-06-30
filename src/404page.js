// @ts-check

import loadPost from "./load-post"

export const load404Page = () => {
    loadPost("Error 404", "Sorry this page could not be found.")
}

export default load404Page
