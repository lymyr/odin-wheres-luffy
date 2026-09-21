import { useContext, useEffect, useRef, useState } from "react"
import BoxContext from "../hooks/BoxContext.js"
import useSubmit from "../hooks/useSubmit.js"

export default ({boxSize, names, setFound, found}) => {
    const [styles, waldoRef, normCoord, imgSize, resetCoord] = useContext(BoxContext)
    const submit = useSubmit()
    const [loading, setLoading] = useState(false)
    const [popupLocX, setPopupLocX] = useState()
    const [popupLocY, setPopupLocY] = useState()
    const [tOrigin, setTOrigin] = useState("center top")
    const dropdownRef = useRef()
    
    useEffect(() => {
        setPopupLocX(normCoord.x > 0.8 ? `- ${dropdownRef.current.scrollWidth}px - ${boxSize/2}vw` : `+ ${boxSize/2}vw`)
        setPopupLocY(normCoord.y > 0.5 ? `- ${dropdownRef.current.scrollHeight}px - ${boxSize/2}vw` : `+ ${boxSize/2}vw`)
        setTOrigin(normCoord.y > 0.5 ? "center bottom" : "center top")
    }, [])

    async function handleClick(name) {
        if (!loading) {
            setLoading(true)
            const data = await submit(normCoord, name)
            if (data.persons.length < names.length) 
                setFound([...found, { coords: normCoord }]);
            setLoading(false)
            resetCoord()
        }
    }

    return (
        <div 
            ref={dropdownRef}
            className={styles.dropdown}
            style={{
                left: `calc(${(normCoord.x * imgSize.width)+waldoRef.current.offsetLeft}px ${popupLocX})`,
                top: `calc(${(normCoord.y * imgSize.height)+waldoRef.current.offsetTop}px ${popupLocY})`,
                transformOrigin: tOrigin
            }}
        >
            <p>Options</p>
            <ul>
                {names.map(name => {
                    return <li 
                        key={name.name} 
                        onClick={async () => handleClick(name.name)}
                        className={loading ? styles.dropdownLoading : undefined}
                    >{name.name}</li>
                })}
            </ul>
        </div>
    )
}