import { useNavigate } from "react-router"
import useGetToken from "../hooks/useGetToken.js"

export default () => {
    const nav = useNavigate()
    const getToken = useGetToken()

    async function handleGetToken() {
        await getToken()
        nav("/sail")
    }

    return (
        <div>
            <header>
                <h1>Where's</h1>
                <h1>Luffy</h1>
            </header>
            <div>
                <button onClick={async () => await handleGetToken()}>Sail the seas!</button>
                <button onClick={() => nav("/sail/leaderboard")}>Leaderboard</button>
                <p>Let's go find Luffy!</p>
            </div>
        </div>
    )
}