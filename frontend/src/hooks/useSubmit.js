import { useContext } from "react"
import TokenContext from "./TokenContext"
import {jwtDecode} from "jwt-decode"

export default () => {
    const [token, setToken] = useContext(TokenContext)
    return async (coords, person, username) => {
        const url = import.meta.env.PROD ? import.meta.env.VITE_API_URL : `http://localhost:${import.meta.env.VITE_LOCALHOST_PORT}`
        const res = await fetch(`${url}/v1/1`, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username,
                coords,
                person,
                token: token.token
            }),
            method: "post"
        })
        const json = await res.json()
        setToken({
            token: json.data.token,
            data: jwtDecode(json.data.token)
        })
        return jwtDecode(json.data.token)
    }
}