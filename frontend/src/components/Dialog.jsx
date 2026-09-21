import { useContext, useState } from "react"
import TokenContext from "../hooks/TokenContext"
import getCurrentTime from "../helpers/getCurrentTime"
import styles from "./Dialog.module.css"

export default ({
    title="Dialog",
    ref=null,
    leaderboard,
    setLeaderboard
}) => {
    const [username, setUsername] = useState()
    const [error, setError] = useState("")
    const [token, setToken] = useContext(TokenContext)
    const score = token ? getCurrentTime(token.data.startTime, token.data.endTime) : 0

    async function submitScore() {
        try {
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
            else if (json.error) {
                if (json.error.username) 
                    throw json.error.username  
                throw json.error
            }
        }
        catch(e) {
            setError(e.msg ? e.msg : e.message)
        }
    }

    function handleClose() {
        ref.current.close()
        setToken()
    }

    return (
        <dialog ref={ref} className={styles.dialog}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.body}>
                <div>
                    <p className={styles.score}>
                        {score}
                    </p>
                    <div>
                        <div className={styles.inputLabel}>
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
                <div className={styles.btnContainer}>
                    <button onClick={handleClose}>Close</button>
                    <button onClick={async () => await submitScore()}>Submit</button>
                </div>
            </div>
        </dialog>
    )
}