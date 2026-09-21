import { useNavigate } from "react-router"
import useGetToken from "../hooks/useGetToken.js"
import styles from "./Home.module.css"
import { useState } from "react"
import gif from "../assets/scuba-cat.gif"
import bgMobile from "../assets/bg-mobile.webp"
import bgDesk from "../assets/bg-desktop.webp"

export default () => {
    const nav = useNavigate()
    const getToken = useGetToken()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    async function handleGetToken() {
        setLoading(true)
        setError()
        try {
            await getToken()
            nav("/sail")
        }
        catch(e) {
            setError(e.message)
            setLoading(false)
        }
        finally {
            setLoading(false)
        }
        
    }

    return (
        <>
             <picture className={styles.bg}>
                <source
                    srcset={bgMobile}
                    media="(orientation: portrait)" />
                <img src={bgDesk}/>
            </picture>

            <div className={styles.home}>
                <header className={styles.header}>
                    <h1>Where's</h1>
                    <h1>Luffy</h1>
                </header>
                <div className={styles.action}>
                    <button 
                        onClick={async () => await handleGetToken()}
                        disabled={loading}
                    >
                        {loading ? "Setting sail..." : "Sail the seas!"}
                    </button>
                    <p>Let's go find Luffy!</p>
                </div>
                <button className={styles.leaderboard} onClick={() => nav("/sail/leaderboard")}>Leaderboard</button>
                {
                    loading && 
                        <div className={styles.loading}>
                            <div>
                                <p>Might take 1-2min to set sail</p>
                                <p>Waking up server...</p>
                            </div>
                            <div>
                                <p>Here's a GIF while you wait :)</p>
                                <img src={gif}/>
                            </div>
                        </div>
                }
                {
                    error &&
                        <div className={styles.error}>
                            <p>Error</p>
                            <p>{error}</p>
                        </div>
                }
            </div>
        </>
        
    )
}