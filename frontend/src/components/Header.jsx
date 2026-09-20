import { useEffect, useState } from "react"
import getCurrentTime from "../helpers/getCurrentTime.js"
export default ({ normCoord, tokenData }) => {
    const [time, setTime] = useState()
    useEffect(() => {
        if (tokenData && tokenData.persons.length > 0) {
            const interval = setInterval(() => {
                setTime(getCurrentTime(tokenData.startTime, new Date()))
            }, 50)
            return () => clearInterval(interval)
        }
        else
            setTime("0.00")
    }, [tokenData])

    

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