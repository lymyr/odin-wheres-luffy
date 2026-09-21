export default (from, to) => {
    const start = new Date(from).getTime()
    const end = new Date(to).getTime()
    
    const totalSeconds = (end - start) / 1000
    const min = Math.floor(totalSeconds / 60)
    const sec = (totalSeconds % 60).toFixed(2)
    
    return `${min}m ${sec}s`
}

export function getDurationMs(from, to) {
    return new Date(to).getTime() - new Date(from).getTime()
}