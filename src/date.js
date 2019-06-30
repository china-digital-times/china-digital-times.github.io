// @ts-check
// 在页面右上角显示日期

const pad0 = (n) => {
    return ("" + n).padStart(2, "0")
}

const getDate = () => {
    const d = new Date()
    return [
        d.getFullYear(),
        pad0(d.getMonth() + 1),
        pad0(d.getDate()),
    ].join(" ")
}

document.getElementById("date").innerText = getDate()
