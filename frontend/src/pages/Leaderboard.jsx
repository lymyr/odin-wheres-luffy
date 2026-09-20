import { useEffect, useState, useRef, useContext } from "react"
import getCurrentTime from "../helpers/getCurrentTime"
import img from "../assets/oneWally.png"
import Dialog from "../components/Dialog"
import TokenContext from "../hooks/TokenContext"

export default () => {
    const [state, setState] = useState("loading")
    const [leaderboard, setLeaderboard] = useState([])
    const dialogRef = useRef()
    const [token] = useContext(TokenContext)

    useEffect(() => {
        let controller = new AbortController();

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

        
        return () => controller.abort()
    }, [])

    return (
        <>
            <header>
                <div>
                    <img src={img}></img>
                </div>
                <div>
                    <h1>Where's Luffy</h1>
                    <p>Leaderboard</p>
                </div>
            </header>
            <main>
                <ol>
                    {
                        leaderboard.map(row => {
                            return (
                                <li key={row.id}>
                                    <p>{row.name}</p>
                                    <p>{getCurrentTime(row.startTime, row.endTime)}</p>
                                </li>
                            )
                        })
                    }
                </ol>
            </main>
            {/* placeholder for username prompt after game */}
            <Dialog 
                ref={dialogRef} 
                title="Submit Score"
                leaderboard={leaderboard}
                setLeaderboard={setLeaderboard}
            />
        </>
        
    )
}