import { useEffect, useState, useRef, useContext } from "react"
import getCurrentTime from "../helpers/getCurrentTime"
import img from "../assets/oneWally.png"
import Dialog from "../components/Dialog"
import TokenContext from "../hooks/TokenContext"

export default () => {
    const [leaderboard, setLeaderboard] = useState([])
    const [state, setState] = useState(leaderboard.length > 0 ? "done" : "loading")
    const dialogRef = useRef()
    const [token] = useContext(TokenContext)

    useEffect(() => {
        let controller = new AbortController();

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
            setState("done")
        }
        catch(e) {
            setState("error")
        }
        
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
                {
                    state == "done" ?
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

                    // todo: improve in the future
                    : state == "error" ?
                        <h1>Someting went wrong :(</h1>
                    :
                        <h1>Loading</h1>
                }
            </main>

            <Dialog 
                ref={dialogRef} 
                title="Submit Score"
                leaderboard={leaderboard}
                setLeaderboard={setLeaderboard}
            />
        </>
        
    )
}