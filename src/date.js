// @ts-check

const pad0 = (n) => {
    return ("" + n).padStart(2, "0")
}

/**
 * @param {Date} d 
 * (以用户本地时间显示)
 */
export const getChineseDateString = (d) => {
    const yyyy = d.getFullYear()
    const mm = d.getMonth() + 1
    const dd = d.getDate()
    let h = d.getHours()
    const m = d.getMinutes()
    const ampm = h >= 12 ? "下午" : "上午"
    h = h % 12
    h = h ? h : 12 // the hour '0' should be '12'
    return `${yyyy}年${mm}月${dd}日, ${h}:${pad0(m)} ${ampm}`
}
