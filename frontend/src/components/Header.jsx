import { useEffect, useState } from "react"
import getCurrentTime from "../helpers/getCurrentTime.js"
import styles from "./Header.module.css"
import getHeaderPictures from "../helpers/getHeaderPictures.js"

export default ({ tokenData }) => {
    const [time, setTime] = useState()
    const picCollection = getHeaderPictures()

    useEffect(() => {
        if (tokenData && tokenData.persons.length > 0) {
            const interval = setInterval(() => {
                setTime(getCurrentTime(tokenData.startTime, new Date()))
            }, 50)
            return () => clearInterval(interval)
        }
        else
            setTime("0.00s")
    }, [tokenData])


    return (
        <header  className={styles.header}>
            <div>
                <p>Time</p>
                <p>{time}</p>
            </div>
            <ul>
                {tokenData?.persons.map(name => {
                    return (
                        <li key={name.id}>
                            <img src={picCollection[`${name.name}`]?.img}/>
                            <p>{name.name}</p>
                        </li>
                    )
                })}
            </ul>
        </header>
    ) 
}