// @ts-check

export const showSearchBox = () => {
    const searchBoxContainer = document.getElementById("search-box")

    const input = document.createElement("input")
    input.type = "text"
    input.id = "s"
    input.value = "站内搜索"
    input.onblur = () => {
        if (input.value == "") {
            input.value = "站内搜索"
        }
    }
    input.onclick = () => {
        if (input.value == "站内搜索") {
            input.value = ""
        }
    }
    searchBoxContainer.appendChild(input)

    const m = location.hash.match(/^#\/search\/(.+)$/)
    if (m) {
        try {
            input.value = decodeURIComponent(m[1])
        } catch {
            input.value = m[1]
        }
    }

    const onSubmit = () => {
        const q = input.value.trim()
        if (q && q != "站内搜索") {
            location.href = "#/search/" + q
        }
    }

    const submitBtn = document.createElement("input")
    submitBtn.type = "submit"
    submitBtn.id = "searchsubmit"
    submitBtn.value = ""
    submitBtn.onclick = onSubmit
    searchBoxContainer.appendChild(submitBtn)

    input.onkeypress = (event) => {
        if (event.key.toLowerCase() == "enter") {
            onSubmit()
        }
    }
}
