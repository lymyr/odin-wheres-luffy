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
            <div>
                <h1>Where's</h1>
                <h1>Luffy</h1>
            </div>
            <div>
                <button onClick={async () => await handleGetToken()}>Sail the seas!</button>
                <p>Let's go find Luffy!</p>
            </div>
        </div>
    )
}