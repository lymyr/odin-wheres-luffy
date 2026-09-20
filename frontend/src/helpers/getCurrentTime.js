import { format } from "date-fns"

export default (from, to) => {
    const start = format(new Date(from), "T")
    const end = format(new Date(to), "T")
    const current = `${parseFloat((end - start) / 1000).toFixed(2)}s`

    return current
}