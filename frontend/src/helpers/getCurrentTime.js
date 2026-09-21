import { format } from "date-fns"

export default (from, to) => {
    const start = format(new Date(from), "T")
    const end = format(new Date(to), "T")
    const min = (parseFloat((end - start) / 1000)/60).toFixed(0)
    const sec = (parseFloat((end - start) / 1000)%60).toFixed(2)
    const current = `${min}m ${sec}s`

    return current
}