export const fecha = (n) => {
    if (n === null) {
        return "-";
    }
    let d = new Date(n);
    return `${d.getDate() < 10 ? d.getDate() + "0" : d.getDate()}-`
        + `${d.getMonth() + 1 < 10 ? (d.getMonth() + 1) + "0" : d.getMonth() + 1}-${d.getFullYear()}`
}