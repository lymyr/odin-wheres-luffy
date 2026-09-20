import { useEffect, useState } from "react"
import {format} from "date-fns"
export default ({ normCoord, tokenData }) => {
    const [time, setTime] = useState(0.00)
    useEffect(() => {
        if (tokenData) {
            const interval = setInterval(() => {
                const now = format(new Date(), "T")
                const start = format(new Date(tokenData.startTime), "T")
                const current = `${parseFloat((now - start) / 1000).toFixed(2)}s`
                setTime(current)
            }, 50)
            return () => clearInterval(interval)
        }
    }, [])

    

    return (
        <header 
            style={{backgroundColor: "white"}}
        >
            <div>
                <p>Time</p>
                <p>{time}</p>
            </div>
            <ul>
                {tokenData?.persons.map(name => {
                    return (
                        // todo: change class name if found
                        <li className="" key={name.id}>
                            <img />
                            <p>{name.name}</p>
                        </li>
                    )
                })}
                
            </ul>
            <div >
                {normCoord.x}, {normCoord.y}
            </div>
        </header>
    ) 
}