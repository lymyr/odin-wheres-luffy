export default (from, to) => {
    const totalSeconds = getDurationMs(from, to) / 1000
    const min = Math.floor(totalSeconds / 60)
    const sec = (totalSeconds % 60).toFixed(2)
    return min ? `${min}m ${sec}s` : `${sec}s`
}

export function getDurationMs(from, to) {
    return new Date(to).getTime() - new Date(from).getTime()
}