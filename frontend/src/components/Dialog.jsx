import { useContext, useState } from "react"
import TokenContext from "../hooks/TokenContext"
import getCurrentTime from "../helpers/getCurrentTime"

export default ({
    title="Dialog",
    ref=null,
    leaderboard,
    setLeaderboard
}) => {
    const [username, setUsername] = useState()
    const [token, setToken] = useContext(TokenContext)

    async function submitScore() {
        const url = import.meta.env.PROD ? import.meta.env.VITE_API_URL : `http://localhost:${import.meta.env.VITE_LOCALHOST_PORT}`
        const res = await fetch(`${url}/v1/${token.data.gameId}/leaderboard`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username,
                token: token.token
            }),
            method: "post"
        })
        const json = await res.json()
        if (res.ok) {
            setToken()
            setLeaderboard([...leaderboard, json.data.user].sort((a, b) => {
                const timeA = parseFloat(getCurrentTime(a.startTime, a.endTime))
                const timeB = parseFloat(getCurrentTime(b.startTime, b.endTime))

                if (timeA > timeB)
                    return 1
                else if (timeA < timeB)
                    return -1
                else
                    return 0
            }))
            ref.current.close()
        }
            
    }
    return (
        <dialog ref={ref}>
            <h3>{title}</h3>
            <div>
                <div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button onClick={() => ref.current.close()}>Close</button>
                    <button onClick={async () => await submitScore()}>Submit</button>
                </div>
            </div>
        </dialog>
    )
}