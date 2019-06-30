// @ts-check

/**
 * 加载文章/页面到网页上
 * @param {string} title 文章标题
 * @param {string | Node} content 文章内容
 */
export const loadPost = (title, content) => {
    const postTitleContainer = document.getElementById("post-title")
    const postContentContainer = document.getElementById("post-content")

    postTitleContainer.innerHTML = title
    document.title = `${title} – 中国数字时代镜像站`

    if (content instanceof Node) {
        postContentContainer.appendChild(content)
    } else {
        postContentContainer.innerHTML = content
    }
}

export default loadPost
