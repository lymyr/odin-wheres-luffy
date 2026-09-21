import { useEffect, useState, useRef, useContext } from "react"
import getCurrentTime from "../helpers/getCurrentTime"
import img from "../assets/oneWally.png"
import Dialog from "../components/Dialog"
import TokenContext from "../hooks/TokenContext"
import styles from "./Leaderboard.module.css"
import { useNavigate } from "react-router"

export default () => {
    const [leaderboard, setLeaderboard] = useState([])
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const dialogRef = useRef()
    const [token] = useContext(TokenContext)

    useEffect(() => {
        let controller = new AbortController();
        setLoading(true)
        try {
            if (token?.data.persons.length == 0) 
                dialogRef.current.showModal();
            (async () => {
                const url = import.meta.env.PROD ? import.meta.env.VITE_API_URL : `http://localhost:${import.meta.env.VITE_LOCALHOST_PORT}`
                const res = await fetch(`${url}/v1/1/leaderboard`, {
                    signal: controller.signal
                })
                const json = await res.json()
                setLeaderboard(json.data.leaderboard)
            })()
        }
        catch(e) {
            setError(e.message)
        }
        finally {
            setLoading(false)
        }
        return () => controller.abort()
    }, [])

    return (
        <>
            <div className={styles.leaderboardRoot}>
                <header className={styles.header}>
                    <div>
                        <img src={img}></img>
                    </div>
                    <div 
                        className={styles.headerTxt}
                        onClick={() => nav('/')}
                    >
                        <div>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <h1>Where's Luffy</h1>
                        </div>
                        <p>Leaderboard</p>
                    </div>
                </header>
                <main className={styles.main}>
                    {
                        loading ? 
                            <div className={styles.spinner}></div>
                        : error ?
                            <div>
                                <h1>Error</h1>
                                <p>{error}</p>
                            </div>
                        :
                            <ol>
                            {
                                leaderboard.map(row => {
                                    return (
                                        <li key={row.id}>
                                            <div>
                                                <p>{row.name}</p>
                                                <p>{getCurrentTime(row.startTime, row.endTime)}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            </ol>
                    }
                </main>
            </div>

            <Dialog 
                ref={dialogRef} 
                title="Submit Score"
                leaderboard={leaderboard}
                setLeaderboard={setLeaderboard}
            />
        </>
        
    )
}